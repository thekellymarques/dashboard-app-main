import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { fDate } from '../utils/formatTime';

import 'moment/locale/en-gb';

// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import {
  getDailyProfitPerPeriod,
  getMonthlyProfitPerPeriod,
  getExaminedPatients,
  getProfitPerExam,
  getTotalProfitForPeriod,
  getWeeklyProfitPerPeriod,
  generateExamsDataset,
  getExamsAggregate,
  getRecentExams,
} from '../services/DashboardService';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [patients, setPatients] = useState(null);
  const [totalProfit, setTotalProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [profitPerExam, setProfitPerExam] = useState([]);
  const [examinedPatients, setExaminedPatients] = useState({ labels: [], aggregate: [] });
  const [examsAggregate, setExamsAggregate] = useState([]);
  const [recentExams, setRecentExams] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handleStartDateChange = (event) => {
    const date = fDate(event.toDate(), 'yyyy-MM-dd');
    setStartDate(date);
  };

  const handleEndDateChange = (event) => {
    const date = fDate(event.toDate(), 'yyyy-MM-dd');
    setEndDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      generateExamsDataset();

      const now = new Date();
      const firstDayOfTheMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayofTheMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      setStartDate(fDate(firstDayOfTheMonth, 'yyyy-MM-dd'));
      setEndDate(fDate(lastDayofTheMonth, 'yyyy-MM-dd'));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        setTotalProfit(getTotalProfitForPeriod(startDate, endDate));
        setWeeklyProfit(getWeeklyProfitPerPeriod(startDate, endDate));
        setMonthlyProfit(getMonthlyProfitPerPeriod(startDate, endDate));
        setDailyProfit(getDailyProfitPerPeriod(startDate, endDate));
        setProfitPerExam(getProfitPerExam(startDate, endDate));
        setExaminedPatients(getExaminedPatients(startDate, endDate));
        setExamsAggregate(getExamsAggregate(startDate, endDate));
        setRecentExams(getRecentExams());
      }

      console.log('startDate or endDate changed:', totalProfit, weeklyProfit, monthlyProfit, dailyProfit);
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <>
      <Helmet>
        <title> Dashboard | ClinAst </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5, mr: 5 }} className="mui-textfield">
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
            <DatePicker sx={{ mr: 2 }} label="Start Date" value={moment(startDate)} onChange={handleStartDateChange} />
            <DatePicker label="End Date" value={moment(endDate)} onChange={handleEndDateChange} />
          </LocalizationProvider>

          {/* <input type="date" name="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
          <input type="date" name="date" id="endDate" value={endDate} onChange={handleEndDateChange} /> */}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Faturamento Diario"
              total={dailyProfit}
              color="error"
              icon={'solar:chat-round-money-bold'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Faturamento Semanal"
              total={weeklyProfit}
              color="info"
              icon={'solar:chat-round-money-bold'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Faturamento Mensal"
              total={monthlyProfit}
              color="warning"
              icon={'solar:chat-round-money-bold'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faturamento Total" total={totalProfit} icon={'solar:chat-round-money-bold'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Pacientes atendidos"
              // subheader="(+43%) do que no ano passado"
              chartLabels={examinedPatients.labels}
              chartData={examinedPatients.aggregate}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Principais fontes de receita"
              chartData={profitPerExam}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              minHeight: 450,
            }}
          >
            <AppConversionRates
              title="Principais exames"
              chartData={examsAggregate}
              sx={{
                minHeight: 450,
              }}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              minHeight: 450,
            }}
          >
            <AppNewsUpdate
              title="Exames recentes"
              list={recentExams}
              sx={{
                minHeight: 450,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
