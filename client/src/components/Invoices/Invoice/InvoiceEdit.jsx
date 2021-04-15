import React, {useEffect, useState, useContext} from 'react'
import {Select, Badge, Grid, Box, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Button, FormHelperText, Text, useDisclosure} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import {Link, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';

const InvoiceEdit = (props) => { 
    //React functions
    useEffect(() => {
        getInvoiceById();
    }, []);

    // React States
    const [invoice, setInvoice] = useState('');
    const [customer, setCustomer] = useState('');
    const [cuStatus, setCuStatus] = useState('');
    const [jobType, setJobType] = useState('');
    
    const [invoiceDate, setInvoiceDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amountDue, setAmountDue] = useState('');
    const [selectInvoiceStatus, setSelectInvoiceStatus] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [selectJobTypeOption, setJobTypeOption] = useState('');


    // Define variables
    const {id} = props.match.params;
    const url = 'http://localhost:8081/api';
    let history = useHistory();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef();

    // functions created by me to get what I need of data
    const getInvoiceById = async () => {
        await axios.get(`${url}/invoices/${id}`)
        .then((response) => {
            const invoiceById = response.data;
            const cu = response.data.cu;
            const invs = response.data.invs;
            const jtype = response.data.jtype;
            //add our data to state
            setInvoice(invoiceById);
            setCustomer(cu);
            setCuStatus(invs);
            setJobType(jtype);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const url2 = `http://localhost:8081/api/invoices/${id}`
        const json = {
            jobTypeId: selectJobTypeOption,
            service_name: serviceName,
            inv_date: invoiceDate,
            due_date: dueDate,
            amount_due: `$${amountDue}`
        }
        await axios.put(url2, json)
        .then((response) => {
            console.log('I was submitted', response);
        })
        .catch((err) => {
            console.error(err);
        })
        setJobTypeOption('');
        setSelectInvoiceStatus('');
        setServiceName('');
        setInvoiceDate('');
        setDueDate('');
        setAmountDue('');
        getInvoiceById();
        onClose();
        console.log('Submit Function works!')
        //history.go(0);
    };

    const statusBadge = () => {
        if(cuStatus.status_name === 'Pending'){
            return(
                <Badge colorScheme='yellow' variant='solid' p='8px' w='110px' textAlign='center'  rounded='xl'>{cuStatus.status_name}</Badge>
            )
        } else if(cuStatus.status_name === 'Paid'){
            return(
                <Badge colorScheme='green' variant='solid' p='8px' w='110px' textAlign='center'  rounded='xl'>{cuStatus.status_name}</Badge>
            )
        } else if(cuStatus.status_name === 'Outstanding') {
            return(
                <Badge colorScheme='red' variant='solid' p='8px' w='110px' textAlign='center'  rounded='xl'>{cuStatus.status_name}</Badge>
            )
        }
    }

    const handleJobTypeInput = (e) => {
        const selectedValue = e.target.value;
        setJobTypeOption(selectedValue);
    };

    const deleteInvoice = async () => {
        // console.log('Button will perform a delete to the database.');
        await axios.delete(`${url}/invoices/${id}`)
        .then((response) => {
            console.log("Invoice has been deleted!")
            return <Redirect to='/invoices' />
        })
        .catch(error => console.error(`Error: ${error}`));
        history.push("/invoices")
                
    }

    const markInvoicePaid = async() => {
        await axios.put(`http://localhost:8081/api/invoices/${id}`, {
            invStatusId : '1'
        })
        .then((response) => {
            getInvoiceById();
            console.log(response);
        })
    };

    const markInvoicePending = async() => {
        await axios.put(`http://localhost:8081/api/invoices/${id}`, {
            invStatusId: '2'
        })
        .then((response) => {
            getInvoiceById();
            console.log(response);
        })
        .catch(error => console.error(`Error: ${error}`));
    };

    const markInvoiceOutstanding = async() => {
        await axios.put(`http://localhost:8081/api/invoices/${id}`, {
            invStatusId: '3'
        })
        .then((response) => {
            getInvoiceById();
            console.log(response);
        })
        .catch(error => console.error(`Error: ${error}`));
    };
    
    
    return (
        <Flex direction='column' justifyContent='center' pb='3rem' pt='1rem' w={[300, 400, 800]} >
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent p='1rem' ml='6rem'>
                        <ModalHeader textAlign='center'>Edit Invoice</ModalHeader>
                        <ModalCloseButton />
                        <form method='PUT' onSubmit={handleSubmit}>
                        <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel pt='1rem'>Job Type</FormLabel>
                                    <Select defaultValue={null} value={selectJobTypeOption} placeholder='Select Job Type' onChange={(e) => handleJobTypeInput(e)}>
                                        <option value='1'>New Roof Installation</option>
                                        <option value='2'>Roof Repair</option>
                                        <option value='3'>Construction</option>
                                    </Select>
                                    {/* <Input value={address} onChange={({target}) => setAddress(target.value)} id='address' placeholder='Street address'/> */}
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel pt='1rem'>Invoice Date</FormLabel>
                                    <Input type='date' value={invoiceDate} onChange={({target}) => setInvoiceDate(target.value)} id='invDate' placeholder='Invoice date'/>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel pt='1rem'>Due Date</FormLabel>
                                    <Input type='date' value={dueDate} onChange={({target}) => setDueDate(target.value)} id='dueDate' placeholder='Due date'/>
                                </FormControl>
                                <FormControl isRequired>
                                <FormLabel pt='1rem'>Service Name</FormLabel>
                                    <InputGroup>
                                        <Input value={serviceName} id='service' onChange={({target}) => setServiceName(target.value)} placeholder='Service Name' />
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel pt='1rem'>Amount Due</FormLabel>
                                    <Input value={amountDue} onChange={({target}) => setAmountDue(target.value)} placeholder='Amount due' type='number'/>
                                </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' onClick={handleSubmit} >Save</Button>
                            <Button onClick={onClose} colorScheme='blue'>Cancel</Button>
                        </ModalFooter>
                        </form>

                    </ModalContent> 
                </Modal>
                    <Link to='/invoices'>
                        <Box display='flex'  pt='1rem' pb='1rem' pl='1rem'>
                            <Box display='flex' rounded='xl' p='1rem'>
                                <Text _hover={{color: "blue.400"}} fontWeight='bold' fontSize='20px'>Go Back</Text> 
                            </Box>
                        </Box>
                    </Link>
                    <Box display='flex' pt='1rem' justifyContent='center'>
                        <Box display='flex' p='1rem' bg='gray.600' rounded='2xl' shadow='md' w={[300, 400, 800]}>
                            <Box display='flex' mr='auto' pl='1rem'>
                                <Box display='flex' flexDir='column' justifyContent='center' pr='1rem'>
                                    <Text fontWeight='light' fontSize='18px' fontWeight='bold' color='white'>Status:</Text>
                                </Box>
                                <Box display='flex' flexDir='column' justifyContent='center' >
                                    {/* <Badge colorScheme='yellow' variant='solid' p='8px'>{cuStatus.status_name}</Badge> */}
                                    {statusBadge()}
                                </Box>
                            </Box>
                            <Box display='flex' pr='1rem'>
                                <Box pr='1rem' >
                                    <Button colorScheme='red' onClick={markInvoiceOutstanding}>Mark Outstanding</Button>
                                </Box>
                                <Box pr='1rem' >
                                    <Button colorScheme='yellow' onClick={markInvoicePending}>Mark Pending</Button>
                                </Box>
                                <Box pr='0rem' >
                                    <Button colorScheme='green' onClick={markInvoicePaid}>Mark Paid</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box display='flex' pt='2rem'  justifyContent='center' color='white'>
                        <Box display='flex' flexDir='column' p='1rem' rounded='2xl' bg='gray.600' shadow='md' w={[300, 400, 800]}>
                            <Box display='flex' justifyContent='flex-end' pr='2rem' pt='1rem'>
                                <Button colorScheme='blue' onClick={onOpen}>Edit</Button>
                                <Box pl='1rem'>
                                    <Button colorScheme='red' onClick={deleteInvoice}>Delete</Button>
                                </Box>
                            </Box>
                            <Box display='flex' p='2rem' bg='gray.600' rounded='xl'>
                                <Box>
                                    <Text fontSize='22px' fontWeight='bold' letterSpacing='1px'>Invoice #{invoice.id}</Text>
                                    <Text  fontSize='20px' fontWeight='light' letterSpacing='1px'>{jobType.type_name}</Text>
                                </Box>
                                <Box display='flex' flexDir='column' ml='auto' >
                                    <Text textAlign='right' fontWeight='bold'>Rios Roofing</Text>
                                    <Text textAlign='right' fontWeight='light'>150 Tallant St</Text>
                                    <Text textAlign='right' fontWeight='light'>Houston, TX</Text>
                                    <Text textAlign='right' fontWeight='light'>77076</Text>
                                    <Text textAlign='right' fontWeight='light'>United States</Text>
                                </Box>
                            </Box>
                            <Box display='flex' justifyContent='center' p='1rem' pt='1rem' pb='1rem'>
                                <Box display='flex' flexDir='column' p='1rem' >
                                    <Box pb='1rem'>
                                        {/* <Editable defaultValue={customer.name}>
                                            <EditablePreview/>
                                            <EditableInput/>
                                            <EditableControls/>
                                        </Editable> */}
                                        <Text fontSize='22px' fontWeight='bold'>Invoice Date:</Text>
                                        <Text>{new Date(invoice.inv_date).toLocaleDateString()}</Text>  
                                    </Box>
                                    <Box>
                                        <Text fontSize='22px' fontWeight='bold'>Payment Due:</Text>
                                        <Text>{new Date(invoice.due_date).toLocaleDateString()}</Text>
                                    </Box>
                                </Box>
                                <Box display='flex' flexDir='column' p='1rem' ml='auto' mr='auto'>
                                    <Box>
                                        <Text fontSize='22px' fontWeight='bold' letterSpacing='1px'>Bill To:</Text>
                                    </Box>
                                    <Box pb='4px'>
                                        <Text letterSpacing='1px'>{customer.name}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight='light' letterSpacing='1px'>{customer.address},</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight='light' letterSpacing='1px'>{customer.city}, {customer.state}, 77076</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight='light' letterSpacing='1px'>{customer.zipcode}</Text>
                                    </Box>
                                    <Box>
                                        <Text letterSpacing='1px'>United States</Text>
                                    </Box>
                                    
                                </Box>
                                <Box display='flex' flexDir='column' p='1rem'>
                                    <Box>
                                        <Text fontSize='22px' fontWeight='bold'>Email To: </Text>
                                    </Box>
                                    <Text letterSpacing='1px'>{customer.email}</Text>
                                </Box>
                            </Box>
                            <Box display='flex' flexDir='column' p='1rem' >
                                <Box display='flex' flexDir='column' bg='gray.700' p='1rem' roundedTop='xl'>
                                    <Box display='flex' justifyContent='space-between' >
                                            <Box ml='1rem'>
                                                <Text letterSpacing='1px' fontSize='18px' fontWeight='bold'>Service Name</Text>    
                                            </Box> 
                                            <Box>
                                                {/* <Text letterSpacing='1px' fontSize='18px' fontWeight='bold'>QTY.</Text> */}
                                            </Box>
                                            <Box>
                                                <Text letterSpacing='1px' fontSize='18px' fontWeight='bold'>Price</Text>
                                            </Box>
                                            <Box mr='1rem'>
                                                <Text letterSpacing='1px' fontSize='18px' fontWeight='bold'>Total</Text>
                                            </Box>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between' pt='1rem' pb='1rem' >
                                            <Box ml='1rem'>
                                                <Text letterSpacing='1px' fontSize='16px' fontWeight='light'>{invoice.service_name}</Text>    
                                            </Box> 
                                            <Box>
                                                {/* <Text letterSpacing='1px' fontSize='16px' fontWeight='bold'>1</Text> */}
                                            </Box>
                                            <Box>
                                                <Text letterSpacing='1px' fontSize='16px' fontWeight='bold'>{invoice.amount_due}</Text>
                                            </Box>
                                            <Box mr='1rem'>
                                                <Text letterSpacing='1px'  fontSize='16px' fontWeight='bold'>{invoice.amount_due}</Text>
                                            </Box>
                                    </Box>
                                </Box>
                                <Box display='flex'  bg='blue.600' p='2rem' roundedBottom='xl'>
                                        <Box ml='auto'>
                                            <Text fontWeight='bold' letterSpacing='1px' fontSize='22px'>Amount Due:</Text>
                                        </Box>
                                        <Box ml='4rem' >
                                            <Text fontWeight='bold' letterSpacing='1px' fontSize='22px'>{invoice.amount_due}</Text>
                                        </Box>
                                    </Box>
                                        
                            </Box>
                            <Grid>

                            </Grid>
                        </Box>
                    </Box>
            </Flex>
    )
}

export default InvoiceEdit;
