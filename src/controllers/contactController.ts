import { Request, Response, Router } from "express";
import User from "../models/User";
import Contact from "../models/Contact";
import asyncHandler from "express-async-handler";

const getAllContacts = asyncHandler(async (req: Request, res: Response) => {
    const contact = await Contact.find().lean();
    if (!contact?.length) {
        res.status(404).json({ message: 'No contacts found' });
        return;
    }

    const contactsWithUser = await Promise.all(contact.map(async (contact) => {
        const user = await User.findById(contact.user).lean().exec()
        return { ...contact, username: user?.username }
    }))

    res.json(contactsWithUser)
})

const createContact = asyncHandler(async (req: Request, res: Response) => {
    const { user, name, email } = req.body

    if (!user || !name || !email) {
        res.status(400).json({ message: 'All fields are required' })
        return;
    }

    const contact = await Contact.create({ user, name, email })

    if (contact) {
        res.status(201).json({ message: 'New note created' })
    } else {
        res.status(400).json({ message: 'Invalid note data received' });
    }
})

const updateContact = asyncHandler(async (req, res) => {
    const { id, user, name, email } = req.body
    if (!id || !user || !name || !email) {
        res.status(400).json({ message: 'All fields are required' })
        return;
    }

    const contact = await Contact.findById(id).exec();

    if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, { user, name, email }, { new: true }).exec();

    if (updatedContact) {
        res.json({ message: 'Note updated successfully' });
    } else {
        res.status(400).json({ message: 'Invalid note data received' });
    }
})


const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({ message: 'Invalid request' });
        return
    }

    const contact = await Contact.findById(id).exec();

    if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return
    }

    await Contact.findByIdAndDelete(id).exec();

    res.json({ message: 'Contact deleted successfully' });
})


export { getAllContacts, createContact, updateContact as updatecontact, deleteContact}