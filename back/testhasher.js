import bcrypt from "bcrypt";

(async () => {
    const users = [
        { first_name: "Alice", last_name: "Dupont", email: "alice.dupont@example.com", password: "testpassword1", role: "subscriber", subscription_id: 1 },
        { first_name: "Bob", last_name: "Martin", email: "bob.martin@example.com", password: "testpassword2", role: "teacher", subscription_id: null },
        { first_name: "Charlie", last_name: "Durand", email: "charlie.durand@example.com", password: "testpassword3", role: "admin", subscription_id: null },
        { first_name: "David", last_name: "Lemoine", email: "david.lemoine@example.com", password: "testpassword4", role: "subscriber", subscription_id: 2 }
    ];

    const hashedUsers = await Promise.all(
        users.map(async user => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
        }))
    );

    console.log("Utilisateurs avec mots de passe hachés :", hashedUsers);
})();