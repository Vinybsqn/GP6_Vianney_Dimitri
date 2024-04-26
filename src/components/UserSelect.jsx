import React from 'react';

const UserSelect = ({ users, onUserSelect, selectedUserId }) => {
    return (
        <div className="user-select mb-5">
            <select onChange={e => onUserSelect(e.target.value)} value={selectedUserId}
                    className="w-full p-2.5 border rounded">
                <option value="">Sélectionnez un utilisateur</option>
                {users.map((user) => (
                    <option key={user.uid} value={user.uid}>{user.firstName} {user.lastName}</option>
                ))}
            </select>
        </div>
    );
};

export default UserSelect;
