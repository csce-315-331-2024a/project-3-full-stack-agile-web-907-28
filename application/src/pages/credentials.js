import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {Button, Card, CardBody, CardFooter, CardHeader, Radio, RadioGroup} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";

const Credentials = () => {
  const [role, setRole] = useState('');
  const { data: session } = useSession(); // Use the session
  const router = useRouter();

  console.log('Credentials');

  const handleSubmit = async (e) => {
    console.log('This user is a', role);
    e.preventDefault();

    // Make sure session data is available
    if (!session) {
      console.error('Session data is not available');
      return;
    }

    const { email, name } = session.user; // Destructure email and name from session.user

    const response = await fetch('/api/onboarding/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, credentials: role }), // Include email and name in the request body
    });

    session.user.isNewUser = false; // Update the session to indicate the user is no longer new
    if (role === 'Manager') {
      router.push('/manager');
    } else if (role === 'Customer') {
      router.push('/customer');
    } else if (role === 'Cashier') {
      router.push('/cashier');
    }
  };


  return (
    <DefaultLayout>
      <div className="flex justify-center">
        <Card className="flex justify-center max-w-sm">
          <CardHeader><h1 className="text-xl font-semibold">Choose your role</h1></CardHeader>
          <CardBody className="justify-between">
            <form onSubmit={handleSubmit}>
              <RadioGroup orientation="vertical" onChange={(e) => setRole(e.target.value)}>
                <Radio value="Customer">Customer</Radio>
                <Radio value="Cashier">Cashier</Radio>
                <Radio value="Manager">Manager</Radio>
              </RadioGroup>
            </form>
          </CardBody>
          <CardFooter className="justify-between">
            <div />
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default Credentials;

