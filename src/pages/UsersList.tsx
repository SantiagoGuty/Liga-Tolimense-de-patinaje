import { useEffect, useState } from 'react';
// Correct import for Amplify v6 client for Amplify Gen 1 (traditional CLI setup)
import { generateClient } from 'aws-amplify/api';

import { listUsers } from '../graphql/queries'; // Your generated GraphQL query
import type { User } from '../API'; // Your generated GraphQL types
import '../styles/userslists.css';
import Menu_bar  from '../components/Menu_bar'
import FooterTol from '../components/FooterTol'

// Initialize the GraphQL client without a specific Schema type (as it's Gen 1)
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
          // Handle specific GraphQL errors, e.g., display an error message to the user
          return;
        }

        if (data && data.listUsers && data.listUsers.items) {
          // Cast the items to your User type for type safety
          setUsers(data.listUsers.items as User[]);
        } else {
          console.warn("No users data found in response or unexpected structure:", data);
          setUsers([]); // Ensure users array is empty if no data is found
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle network errors or other exceptions during the fetch
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once after the initial render

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