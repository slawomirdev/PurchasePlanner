import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import { useCookies } from 'react-cookie';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type Summary = {
  year: number;
  month: number;
  total: number;
};

const ExpenseSummary = ({ lists }: any) => {
  const [cookies] = useCookies(['Email']);
  const userEmail = cookies.Email;
  const [summary, setSummary] = useState<Summary[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    api
      .get('/summary/' + userEmail)
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [userEmail, lists]);

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
  };

  const monthNames = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];

  const uniqueYears = Array.from(new Set(summary.map((item) => item.year)));
  const uniqueMonths = Array.from(new Set(summary.map((item) => item.month)));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        mt: '1rem',
      }}
    >
      <Typography variant="h6">Podsumowanie wydatków</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Select
          value={selectedMonth.toString()}
          onChange={handleChangeMonth}
          size="small"
        >
          {uniqueMonths.map((month) => (
            <MenuItem key={month} value={month}>
              {monthNames[month - 1]}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedYear.toString()}
          onChange={handleChangeYear}
          size="small"
        >
          {uniqueYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Typography variant="body1">
        Wydatki za wybrany miesiąc:{' '}
        {summary.find(
          (item) =>
            Number(item.year) === selectedYear &&
            Number(item.month) === selectedMonth
        )?.total || 0}
        zł
      </Typography>
    </Box>
  );
};

export default ExpenseSummary;
