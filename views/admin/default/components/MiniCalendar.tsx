'use client';
import { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { Text, Icon } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Card from '@/components/dashboard/card/Card';

export default function MiniCalendar(props: {
  selectRange: boolean;
  [x: string]: any;
}) {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState<Date | Date[] | null>(new Date());

  const handleChange = (newValue: Date | Date[] | null, event: React.MouseEvent<HTMLButtonElement>) => {
    setValue(newValue);
  };

  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={handleChange as CalendarProps['onChange']} 
        value={value as CalendarProps['value']}  // Type assertion here
        selectRange={selectRange}
        view={'month'}
        tileContent={<Text color="brand.500" />}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
    </Card>
  );
}



