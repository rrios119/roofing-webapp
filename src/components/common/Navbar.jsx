import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Avatar,
  Tooltip,
  VStack,
  useColorModeValue,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  CloseButton,
  Icon,
  MenuGroup,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody
} from '@chakra-ui/react';
import Toggle from './Toggle';
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers, FiInbox, FiGrid, FiFileText, FiMenu } from 'react-icons/fi';
import { TbRuler } from 'react-icons/tb';
import { useAuth } from '../../hooks/useAuth';
import swal from 'sweetalert';
import { LogIn, LogOut, PlusSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //Style for Card component
  const bg = useColorModeValue('white', 'gray.700');
  const buttonBackground = useColorModeValue('gray.100', 'gray.600');
  const tooltipBackground = useColorModeValue('gray.700', 'gray.100');
  const iconColors = useColorModeValue('#454947', 'white');
  const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure();

  const logout = () => {
    auth.signOut();
    swal('Logged Out!', 'You are now logged out from the system!', 'success');
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        zIndex={'1'}
        position="fixed"
        w={{ base: 'full', lg: '6rem' }}
        h={{ base: '5rem', lg: '100vh' }}
        bg={bg}
        roundedTopRight={{ base: '0', lg: '0' }}
        roundedBottomRight={{ base: '0', lg: '0' }}
        flexDir={{ base: 'row', lg: 'column' }}
        shadow={'xs'}
        p="0"
        m="0"
        top={{ base: '0', lg: '0' }}
        borderRightWidth="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}>
        <Link to="/">
          <Box display={'flex'} p="1rem" justifyContent={'center'} h={{ base: 'full', lg: 'auto' }}>
            <Box
              display="flex"
              flexDir={{ base: 'column', lg: 'column' }}
              h={{ base: 'full', lg: '4rem' }}
              bg={'blue.500'}
              shadow="sm"
              rounded="18"
              justifyContent={{ base: 'center', lg: 'center' }}
              px={{ base: '0px', lg: '0rem' }}
              _hover={{ bg: 'blue.600' }}>
              <Image
                p={{ base: '3px', lg: '4px' }}
                mx={{ base: 'auto', lg: 'auto' }}
                marginLeft={{ base: '0px', lg: '0' }}
                boxSize={{ base: '50px', lg: '90px' }}
                src="/assets/LogoRR.png"
              />
            </Box>
          </Box>
        </Link>
        <VStack display={{ base: 'none', lg: 'flex' }} spacing="6" color={'white'}>
          <Box
            display="flex"
            color="white"
            justifyContent="center"
            paddingTop="10px"
            paddingBottom="0px"></Box>
          <Text color={'GrayText'} fontSize={'10px'} fontWeight={'bold'}>
            ANALYTICS
          </Text>
          <Link to={'/'}>
            <Tooltip label="Dashboard" bg={tooltipBackground}>
              <Box p={'1'} rounded="md" _hover={{ bg: buttonBackground }}>
                {/* <MdDashboard color={iconColors} size={"28px"} /> */}
                <FiGrid color={iconColors} size={'25px'} />
              </Box>
            </Tooltip>
          </Link>
          <Text color={'GrayText'} fontSize={'10px'} fontWeight={'bold'}>
            CONTENT
          </Text>
          <Link to={'/leads'}>
            <Tooltip label="Leads" bg={tooltipBackground}>
              <Box p={'1'} rounded="md" _hover={{ bg: buttonBackground }}>
                {/* <MdScheduleSend size={'30px'}/> */}
                {/* <AiFillSchedule color={iconColors} size={"28px"} /> */}
                <FiInbox color={iconColors} size="25px" />
              </Box>
            </Tooltip>
          </Link>
          <Link to={'/invoices'}>
            <Tooltip label="Invoices" bg={tooltipBackground}>
              <Box p={'1'} rounded="md" _hover={{ bg: buttonBackground }}>
                {/* <MdRequestPage color={iconColors} size={"28px"} /> */}
                <FiFileText color={iconColors} size={'25px'} />
              </Box>
            </Tooltip>
          </Link>
          <Link to={'/quotes'}>
            <Tooltip label="Quotes" bg={tooltipBackground}>
              <Box p={'1'} rounded="md" _hover={{ bg: buttonBackground }}>
                {/* <MdSquareFoot color={iconColors} size={"28px"} /> */}
                <TbRuler color={iconColors} size={'25px'} />
              </Box>
            </Tooltip>
          </Link>
          <Link to={'/customers'}>
            <Tooltip label="Customers" bg={tooltipBackground}>
              <Box p={'1'} rounded="md" _hover={{ bg: buttonBackground }}>
                {/* <MdPeopleAlt color={iconColors} size={"28px"} /> */}
                <FiUsers color={iconColors} size={'25px'} />
              </Box>
            </Tooltip>
          </Link>
          <Text color={'GrayText'} fontSize={'10px'} fontWeight={'bold'}>
            SHORTCUT
          </Text>
        </VStack>
        <Box
          display={{ base: 'none', lg: 'flex' }}
          justifyContent="center"
          marginTop={{ base: '0', lg: 'auto' }}
          marginLeft={{ base: 'auto', lg: '0' }}
          p="0rem">
          {/* <Link to='/'>
                    <Box _hover={{bg: "gray.600"}} rounded='md' p='8px' color='white'>
                        <Tooltip label='Home' bg="gray.500">
                            <HomeIcon fontSize='large' _hover={{bg: "red"}}/>
                        </Tooltip>
                    
                    </Box>
                </Link> */}
          <Box
            display={{ base: 'none', lg: 'flex' }}
            color="white"
            justifyContent="center"
            paddingTop="1rem"
            paddingBottom="1rem">
            <Toggle />
          </Box>
        </Box>
      </Flex>

      {/* Mobile Navbar */}
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        w="full"
        alignItems={'center'}
        px="4"
        bg={bg}
        position="fixed"
        h="5rem"
        zIndex={'1'}
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.600')}
        backdropBlur={'md'}>
        <Flex alignItems={'center'}>
          <Link to={'/'}>
            <Box bg={'blue.500'} rounded="xl" _hover={{ bg: 'blue.500' }} shadow="sm" mx={'1rem'}>
              <Image
                p={{ base: '2px', lg: '4px' }}
                boxSize={{ base: '45px', lg: '90px' }}
                src="/LogoRR.png"
              />
            </Box>
          </Link>
        </Flex>

        <HStack spacing={'0'} gap={1}>
          <Toggle />
          <Flex alignItems={'center'} pr={4}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    w={'32px'}
                    h={'32px'}
                    bg={'gray.400'}
                    src={auth.user ? auth.user.user_metadata.avatar_url : ''}
                  />
                </HStack>
              </MenuButton>
              {auth.user ? (
                <MenuList>
                  <MenuGroup title="My Account" icon={<User />}>
                    <MenuItem flexDir={'row'} gap={'2'}>
                      <User size={'15px'} />
                      <Text>Profile</Text>
                    </MenuItem>
                    <MenuItem flexDir={'row'} gap={'2'}>
                      <Settings size={'15px'} />
                      <Text>Settings</Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem onClick={logout} flexDir={'row'} gap={'2'}>
                      <LogOut size={'15px'} />
                      <Text>Sign Out</Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuGroup title="My Account" icon={<User size={'15px'} />}>
                    <Link to={'/login'}>
                      <MenuItem flexDir={'row'} gap={'2'}>
                        <LogIn size={'15px'} />
                        {/* <LogOut size={'15px'} /> */}
                        <Text>Login</Text>
                      </MenuItem>
                    </Link>
                  </MenuGroup>
                </MenuList>
              )}
            </Menu>
          </Flex>
          <IconButton
            size={'md'}
            onClick={onNavOpen}
            variant="solid"
            aria-label="open menu"
            icon={<FiMenu />}
          />
        </HStack>
      </Flex>
      <Drawer placement="right" size={'full'} isOpen={isNavOpen} onClose={onNavClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box transition={'3s ease'} bg={bg} w={'full'} pos={'fixed'} h="full" pt={'1rem'}>
            <Flex h={20} alignItems="center" mx={8} justifyContent={'space-between'}>
              <Flex>
                <Box
                  bg={'blue.500'}
                  rounded="xl"
                  _hover={{ bg: 'blue.600' }}
                  shadow="sm"
                  mx={'1rem'}>
                  <Image
                    p={{ base: '2px', lg: '4px' }}
                    boxSize={{ base: '50px', lg: '90px' }}
                    src="/LogoRR.png"
                  />
                </Box>
                <Text my={'auto'} fontSize={'xl'} fontWeight={600}>
                  The Roofing App
                </Text>
              </Flex>
              <CloseButton display={'flex'} onClick={onNavClose} />
            </Flex>
            <Flex mx={8}>
              <Box w={'full'} py={'1rem'}>
                <Link to={'/'}>
                  <Flex
                    align={'center'}
                    p="4"
                    mx={4}
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    _hover={{ bg: 'blue.400', color: 'white' }}
                    onClick={onNavClose}>
                    <Icon mr={4} fontSize="20" _groupHover={{ color: 'white' }} as={FiGrid} />
                    Dashboard
                  </Flex>
                </Link>
                <Link to={'/leads'}>
                  <Flex
                    align={'center'}
                    p="4"
                    mx={4}
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    _hover={{ bg: 'blue.400', color: 'white' }}
                    onClick={onNavClose}>
                    <Icon mr={4} fontSize="20" _groupHover={{ color: 'white' }} as={FiInbox} />
                    Leads
                  </Flex>
                </Link>
                <Link to={'/invoices'}>
                  <Flex
                    align={'center'}
                    p="4"
                    mx={4}
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    _hover={{ bg: 'blue.400', color: 'white' }}
                    onClick={onNavClose}>
                    <Icon mr={4} fontSize="20" _groupHover={{ color: 'white' }} as={FiFileText} />
                    Invoices
                  </Flex>
                </Link>
                <Link to={'/quotes'}>
                  <Flex
                    align={'center'}
                    p="4"
                    mx={4}
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    _hover={{ bg: 'blue.400', color: 'white' }}
                    onClick={onNavClose}>
                    <Icon mr={4} fontSize="20" _groupHover={{ color: 'white' }} as={TbRuler} />
                    Quotes
                  </Flex>
                </Link>
                <Link to={'/customers'}>
                  <Flex
                    align={'center'}
                    p="4"
                    mx={4}
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    _hover={{ bg: 'blue.400', color: 'white' }}
                    onClick={onNavClose}>
                    <Icon mr={4} fontSize="20" _groupHover={{ color: 'white' }} as={FiUsers} />
                    Customers
                  </Flex>
                </Link>
              </Box>
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
