// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '@/components/dashboard/card/Card';
import PieChart from '@/components/dashboard/charts/PieChart';
import InvPieChart from '@/components/dashboard/charts/InvPieChart';
import { pieChartData, pieChartOptions } from '@/components/dashboard/variables/charts';
import { InvpieChartData, InvpieChartOptions } from '@/components/dashboard/variables/charts';
import { VSeparator } from '@/components/dashboard/separator/Separator';
import {useState} from 'react';


export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props;
  
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  
	const [selectedOption, setSelectedOption] = useState('Budget');
  
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  setSelectedOption(event.target.value);
	};
  
	return (
	  <Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
		<Flex
		  px={{ base: '0px', '2xl': '10px' }}
		  justifyContent='space-between'
		  alignItems='center'
		  w='100%'
		  mb='8px'
		>
		  
		  <Select
			fontSize='sm'
			variant='subtle'
			defaultValue='Budget'
			width='unset'
			fontWeight='700'
			onChange={handleSelectChange}
		  >
			<option value='Budget'>Budget</option>
			<option value='Inventory'>Inventory</option>
		  </Select>
		</Flex>
  
		{selectedOption === 'Budget' ? (
  <>
    <Text color={textColor} fontSize='md' fontWeight='600' mt='-15px' mb='4px'>
      Budget
    </Text>
    <PieChart h='100%' w='100%' chartData={pieChartData} chartOptions={pieChartOptions} />
    <Card
      bg={cardColor}
      flexDirection='row'
      boxShadow={cardShadow}
      w='100%'
      p='15px'
      px='20px'
      mt='15px'
      mx='auto'
    >
      <Flex
        direction='column'
        py='5px'
        align='center'
        justifyContent='center'
        flex="1" // Added flex property to take up all available space
      >
        <Flex align='center'>
          <Box h='8px' w='8px' bg='#45B745' borderRadius='50%' me='4px' />
          <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
            NSF Grant
          </Text>
        </Flex>
        <Text fontSize='lg' color={textColor} fontWeight='700'>
          52%
        </Text>
      </Flex>
      <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
      <Flex
        direction='column'
        py='5px'
        me='10px'
        align='center'
        justifyContent='center'
        flex="1" // Added flex property to take up all available space
      >
        <Flex align='center'>
          <Box h='8px' w='8px' bg='#FFC900' borderRadius='50%' me='4px' />
          <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
            USC
          </Text>
        </Flex>
        <Text fontSize='lg' color={textColor} fontWeight='700'>
          28%
        </Text>
      </Flex>
      <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
      <Flex
        direction='column'
        py='5px'
        me='10px'
        align='center'
        justifyContent='center'
        flex="1" // Added flex property to take up all available space
      >
        <Flex align='center'>
          <Box h='8px' w='8px' bg='#E52E2E' borderRadius='50%' me='4px' />
          <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
            Venture Capitalist
          </Text>
        </Flex>
        <Text fontSize='lg' color={textColor} fontWeight='700'>
          20%
        </Text>
      </Flex>
    </Card>
  </>
) : (
		  <>
         <Text color={textColor} fontSize='md' fontWeight='600' mt='-15px' mb='4px'>
      Inventory
    </Text>
    <InvPieChart h='100%' w='100%' chartData={InvpieChartData} chartOptions={InvpieChartOptions} />
    <Card
      bg={cardColor}
      flexDirection='row'
      boxShadow={cardShadow}
      w='100%'
      p='15px'
      px='20px'
      mt='15px'
      mx='auto'
    >
      <Flex
        direction='column'
        py='5px'
        alignItems='center'
        justifyContent='center'
        flex="1" // Added flex property to take up all available space
      >
        <Flex align='center'>
          <Box h='8px' w='8px' bg='#45B745' borderRadius='50%' me='4px' />
          <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
            Adequate Stock
          </Text>
        </Flex>
        <Text fontSize='lg' color={textColor} fontWeight='700'>
          74%
        </Text>
      </Flex>
      <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
      <Flex
        direction='column'
        py='5px'
        me='10px'
        align='center'
        justifyContent='center'
        flex="1" // Added flex property to take up all available space
      >
        <Flex align='center'>
          <Box h='8px' w='8px' bg='#FFC900' borderRadius='50%' me='4px' />
          <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
            Low-Moderate Stock
          </Text>
        </Flex>
        <Text fontSize='lg' color={textColor} fontWeight='700'>
          21%
        </Text>
      </Flex>
      <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
      <Flex
        direction='column'
        py='5px'
        me='10px'
        align='center'
        justifyContent='center'
        flex="1" // Added flex property to take up all available space
      >
        <Flex align='center'>
          <Box h='8px' w='8px' bg='#E52E2E' borderRadius='50%' me='4px' />
          <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
            At Risk of Depletion
          </Text>
        </Flex>
        <Text fontSize='lg' color={textColor} fontWeight='700'>
          5%
        </Text>
      </Flex>
    </Card>
		  </>
		)}
	  </Card>
	);
  }