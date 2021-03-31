import React from 'react'
import { Box, Flex, Avatar, Text, Grid, Button, Badge} from "@chakra-ui/react";
import {ChevronRightIcon} from '@chakra-ui/icons'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import {Link} from 'react-router-dom'


function Dashboard() {
    return (
        <main>
            <Flex flexDir='column'>
                <Box display='flex' pt='1rem'>
                    <Box p='1rem'> 
                        <Avatar size='lg' name='username' src='https://64.media.tumblr.com/073578da50f557bd56caef112e255950/b754da231bb4bd69-34/s640x960/4f8c9cf93d4f03c42d448eba0dac2a9cbb2a69e2.jpg'/>
                        
                    </Box>
                    <Box display='flex' flexDir='column' justifyContent='center'>
                        <Text fontSize='25px' fontWeight='black'>SimplyNex</Text>
                        <Text>Welcome! Today is March 31, 2021</Text>
                    </Box>
                    <Box ml='auto' p='1rem'>
                        <Button colorScheme='blue'>Logout</Button>
                    </Box>
                </Box>
                <Box display='flex' flexDir='column' pb='1rem'>
                    <Box>
                        <Text fontSize='30px' fontWeight='black'>Upcoming Jobs</Text>
                    </Box>
                    <Grid p='1rem' gap='3' >
                        <Box display='flex' justifyContent='space-between' bg='gray.700' p='1rem' rounded='xl'>
                            <Box pl='1rem' pr='1rem'>
                                <Badge variant='subtle' colorScheme='green'>Status</Badge>
                            </Box>
                            <Box pl='1rem' pr='1rem'>
                                <Text>Customer Name</Text>
                            </Box>
                            <Box pl='1rem' pr='1rem'>
                                <Text>Phone Number</Text>
                            </Box>
                            <Box pl='1rem' pr='1rem'>
                                <Text>Home Address</Text>
                            </Box>
                            <Box >
                                <ChevronRightIcon fontSize='20px'/>
                            </Box>

                        </Box>
                        <Box display='flex' justifyContent='space-between' bg='gray.700' p='1rem' rounded='xl'>
                            <Box pl='1rem' pr='1rem'>
                                <Badge variant='subtle' colorScheme='green'>Status</Badge>
                            </Box>
                            <Box pl='1rem' pr='1rem'>
                                <Text>Customer Name</Text>
                            </Box>
                            <Box pl='1rem' pr='1rem'>
                                <Text>Phone Number</Text>
                            </Box>
                            <Box pl='1rem' pr='1rem'>
                                <Text>Home Address</Text>
                            </Box>
                            <Box pl='25rem'>
                                <ChevronRightIcon fontSize='20px'/>
                            </Box>

                        </Box>
                    </Grid>

                </Box>
                
                <Grid templateColumns='repeat(3, 1fr)' gap='5' pb='1rem' pl='2rem'>
                    <Box display='flex' flexDir='column' justifyContent='center' p='1rem' boxSize='280px' bg='gray.700' rounded='2xl' shadow='md' >
                        <Box display='flex' justifyContent='center'>
                            <DescriptionIcon style={{fontSize: 100}} />
                        </Box>
                        <Box display='flex' justifyContent='center' pt='1rem'>
                            <Text fontSize='20px' fontWeight='black'>Invoices</Text>
                        </Box>

                    </Box>
                    <Box display='flex' flexDir='column' justifyContent='center' p='1rem' boxSize='280px' bg='gray.700' rounded='2xl' shadow='md'>
                        <Box display='flex' justifyContent='center'>
                            <AssignmentIcon style={{fontSize: 100}} />
                        </Box>
                        <Box display='flex' justifyContent='center' pt='1rem'>
                            <Text fontSize='20px' fontWeight='black'>Estimates</Text>
                        </Box>
                    </Box>
                    <Box display='flex' flexDir='column' justifyContent='center' p='1rem' boxSize='280px' bg='gray.700' rounded='2xl' shadow='md'>
                        <Box display='flex' justifyContent='center'>
                            <AccessTimeIcon style={{fontSize: 100}} />
                        </Box>
                        <Box display='flex' justifyContent='center' pt='1rem'>
                            <Text fontSize='20px' fontWeight='black'>Job Schedule</Text>
                        </Box>
                    </Box>
                    <Box display='flex' flexDir='column' justifyContent='center' p='1rem' boxSize='280px' bg='gray.700' rounded='2xl' shadow='md'>
                        <Box display='flex' justifyContent='center'>
                            <BallotIcon style={{fontSize: 100}} />
                        </Box>
                        <Box display='flex' justifyContent='center' pt='1rem'>
                            <Text fontSize='20px' fontWeight='black'>Materials</Text>
                        </Box>

                    </Box>    
                    <Box display='flex' flexDir='column' justifyContent='center' p='1rem' boxSize='280px' bg='gray.700' rounded='2xl' shadow='md'>
                        <Link to='/customers'>
                            <Box display='flex' justifyContent='center'>
                                <PersonPinIcon style={{fontSize: 100}} />
                            </Box>
                            <Box display='flex' justifyContent='center' pt='1rem'>
                                <Text fontSize='20px' fontWeight='black'>Customers</Text>
                            </Box>
                        </Link>
 
                    </Box>
                    <Box display='flex' flexDir='column' justifyContent='center' p='1rem' boxSize='280px' bg='gray.700' rounded='2xl' shadow='md'>
                        <Link>
                        </Link>
                        <Box display='flex' justifyContent='center'>
                            <PermContactCalendarIcon style={{fontSize: 100}} />
                        </Box>
                        <Box display='flex' justifyContent='center' pt='1rem'>
                            <Text fontSize='20px' fontWeight='black'>Employees</Text>
                        </Box>
                    </Box>

                </Grid>

            </Flex>
        </main>
    )
}

export default Dashboard;