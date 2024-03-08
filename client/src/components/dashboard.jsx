import React, { useState } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";
import Cookies from "universal-cookie";

const Dashboard = () => {
    const cookies = new Cookies();
    

    const token = cookies.get("TOKEN");
    return (
        <>
        <h1>Welcome to TestFormat dashboard, {token.user.firstName} {token.user.lastName}</h1>
        <Button colorScheme='blue'
            size="lg"
            width="50%"
            onClick={handleLogout}
            >
            Logout
        </Button>
        </>
    );
}

export default Dashboard;