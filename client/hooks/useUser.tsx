import { useState } from "react";
function generateRandomId(min: number = 10, max: number = 100000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomId = generateRandomId();

const useUser = () => {
    const [user, setUser] = useState({ id: randomId });

    return { user };
};

export default useUser;
