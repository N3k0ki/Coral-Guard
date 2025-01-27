import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase'; // Certifique-se de ajustar a importação do Firebase conforme sua configuração
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState({}); // Armazena os tipos de conta sendo editados

    // Função para ordenar os usuários por tipo de conta
    const ordenarUsuarios = (usuariosData) => {
        const tipoOrdenado = ['adm', 'mod', 'org', 'cliente']; // Ordem desejada
        return usuariosData.sort((a, b) => tipoOrdenado.indexOf(a.tipo) - tipoOrdenado.indexOf(b.tipo));
    };

    // Busca todos os usuários do Firestore
    useEffect(() => {
        const fetchUsuarios = async () => {
            const usuariosRef = collection(db, 'Usuarios');
            const snapshot = await getDocs(usuariosRef);

            const usuariosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsuarios(ordenarUsuarios(usuariosData)); // Ordena a lista ao buscar os dados
        };

        fetchUsuarios();
    }, []);

    // Atualiza o tipo de conta do usuário
    const salvarTipo = async () => {
        for (let id in editando) {
            const tipoAtualizado = editando[id];
            if (tipoAtualizado) {
                const referencia = doc(db, 'Usuarios', id);
                await updateDoc(referencia, { tipo: tipoAtualizado });

                // Atualiza o estado local para refletir as mudanças
                setUsuarios(prevUsuarios =>
                    prevUsuarios.map(user =>
                        user.id === id ? { ...user, tipo: tipoAtualizado } : user
                    )
                );
            }
        }

        // Ordena os usuários novamente após a atualização
        setUsuarios(prevUsuarios => ordenarUsuarios(prevUsuarios));

        alert('Tipos de conta atualizados com sucesso!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1>Gerenciar Usuários</h1>
            <button onClick={salvarTipo}>Salvar Alterações</button>
            <table border="1" style={{ width: '80%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Senha</th>
                        <th>Tipo de Conta</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.senha}</td>
                            <td>
                                <select
                                    value={editando[usuario.id] || usuario.tipo}
                                    onChange={(e) => {
                                        setEditando(prev => ({ ...prev, [usuario.id]: e.target.value }));
                                    }}
                                >
                                    <option value="adm">Administrador</option>
                                    <option value="mod">Moderador</option>
                                    <option value="org">Organizador</option>
                                    <option value="cliente">Cliente</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;