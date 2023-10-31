const express = require('express');
const Customer = require('../Models/Customer '); 
const verifyToken = require('../Middlewares/authMiddleware');
const router = express.Router();

router.use(verifyToken);

// Add Customer endpoint
router.post('/add', async (req, res) => {
    try {
        const { customer_name, customer_email, contact_number, address } = req.body;

        const newCustomer = new Customer({
            user_id: req.user.id,
            customer_name,
            customer_email,
            contact_number,
            address
        });

        await newCustomer.save();

        res.status(201).send('Customer added successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// Update Customer endpoint
router.put('/update/:customer_id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customer_id);
        console.log(customer)
        if (!customer || customer.user_id.toString() !== req.user.id) {
            return res.status(404).send('Customer not found or unauthorized');
        }

        for (let key in req.body) {
            if (customer[key] !== undefined) {
                customer[key] = req.body[key];
            }
        }

        await customer.save();

        res.status(200).send('Customer updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Delete Customer endpoint
router.delete('/delete/:customer_id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.customer_id, user_id: req.user.id });
        if (!customer) {
            return res.status(404).send('Customer not found or unauthorized');
        }

        await Customer.findByIdAndDelete(customer._id);

        res.status(200).send('Customer deleted successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
});

// Get Customer endpoint
router.get('/:customer_id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.customer_id, user_id: req.user.id });
        if (!customer) {
            return res.status(404).send('Customer not found or unauthorized');
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// List Customers endpoint
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({ user_id: req.user.id });

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/add-sample-customers', async (req, res) => {
    try {
        const sampleCustomers = [
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Alice Johnson", customer_email: "alice.johnson@example.com", contact_number: "123-456-7890", address: "123 Elm Street" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Bob Smith", customer_email: "bob.smith@example.com", contact_number: "234-567-8901", address: "456 Maple Avenue" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Charlie Brown", customer_email: "charlie.brown@example.com", contact_number: "345-678-9012", address: "789 Oak Drive" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Diana Prince", customer_email: "diana.prince@example.com", contact_number: "456-789-0123", address: "101 Pine Lane" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Edward Norton", customer_email: "edward.norton@example.com", contact_number: "567-890-1234", address: "202 Birch Street" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Fiona Apple", customer_email: "fiona.apple@example.com", contact_number: "678-901-2345", address: "303 Cedar Way" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "George Michael", customer_email: "george.michael@example.com", contact_number: "789-012-3456", address: "404 Spruce Blvd" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Hannah Montana", customer_email: "hannah.montana@example.com", contact_number: "890-123-4567", address: "505 Redwood Ct" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Isaac Newton", customer_email: "isaac.newton@example.com", contact_number: "901-234-5678", address: "606 Walnut St" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Julia Roberts", customer_email: "julia.roberts@example.com", contact_number: "012-345-6789", address: "707 Chestnut Ave" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Kevin Bacon", customer_email: "kevin.bacon@example.com", contact_number: "123-456-7890", address: "808 Willow Rd" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Lucy Liu", customer_email: "lucy.liu@example.com", contact_number: "234-567-8901", address: "909 Palm Dr" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Mike Myers", customer_email: "mike.myers@example.com", contact_number: "345-678-9012", address: "1010 Fir Ln" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Nina Simone", customer_email: "nina.simone@example.com", contact_number: "456-789-0123", address: "1111 Pineapple Pl" },
            { user_id: "6534129b99745f0add6f96cf", customer_name: "Oscar Wilde", customer_email: "oscar.wilde@example.com", contact_number: "567-890-1234", address: "1212 Mango Blvd" }
        ];
        
        
        await Customer.insertMany(sampleCustomers);
        
        res.status(201).send({ message: '15 random customers added successfully!' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to add customers.' });
    }
});


module.exports = router;
