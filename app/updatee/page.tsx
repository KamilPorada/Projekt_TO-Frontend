'use client'
import React, { useState } from 'react';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';

const Update = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sqlCode, setSqlCode] = useState(`CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <Button onClick={handleModalOpen}>Open Modal</Button>
            {isModalOpen && <Modal onAction={handleModalClose} onClose={handleModalClose} code={sqlCode} />}
        </div>
    );
};

export default Update;
