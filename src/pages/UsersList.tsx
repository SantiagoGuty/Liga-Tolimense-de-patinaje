import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';

import { listUsers } from '../graphql/queries'; 
import type { User } from '../API'; 
import '../styles/userslists.css';
import Menu_bar  from '../components/Menu_bar'
import FooterTol from '../components/FooterTol'

const client = generateClient();

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use client.graphql for GraphQL operations in Amplify v6
        // The type for 'data' might be 'any' or require specific casting based on your Amplify setup
        const { data, errors } = await client.graphql({
          query: listUsers
        });

        if (errors) {
          console.error("GraphQL Errors:", errors);
          return;
        }

        if (data && data.listUsers && data.listUsers.items) {
          setUsers(data.listUsers.items as User[]);
        } else {
          console.warn("No users data found in response or unexpected structure:", data);
          setUsers([]); 
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); 

  return (

    <>

    

    <div className="users-list-page">
          <Menu_bar/>

      <h1>Usuarios Registrados</h1>
      {users.length === 0 ? (
        <p>Cargando usuarios o no hay usuarios para mostrar...</p>
      ) : (
        <ul className="users-list">
          {users.map(u => (
            <li key={u.id}>
              <strong>{u.nombre} {u.apellido}</strong><br/>
              <small>{u.correo}</small>
            </li>
          ))}
        </ul>
      )}
    </div>

        <FooterTol/>

      </>

  );
}