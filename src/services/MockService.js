import { fDate } from '../utils/formatTime';

const exams = [
    'Ultrasonografia',
    'Hemograma',
    'Radiografia',
    'Tomografia',
    'Eletrocardiograma',
    'Endoscopia',
    'Ressonância Magnética',
    'Exame de Urina',
    'Exame de Fezes',
    'Biópsia'
];

const doctors = [
    'Carlos Oliveira',
    'Francisco da Cunha',
    'Juliana Barros',
    'Maria Santos',
    'Roberto Alves',
    'Luciana Souza',
    'Fernanda Lima',
    'Gabriela Costa',
    'Ricardo Tavares'
];

const healthInsurances = [
    'Notredame Intermédica',
    'Prevent Senior',
    'Transmontano Saúde',
    'Unimed'
];

export const getExamsForThePastMonths = (months) => {

    const examList = [];
    const now = Date.now();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    while (startDate < now) {

        /* 
        * For each day, generate a random number of consultation
        * per exam types
        */

        const formattedDate = fDate(startDate, 'yyyy-MM-dd');
        const examsInDate = Math.random(1,10) * 100;

        for (let index = 0; index < examsInDate; index+=1) {
            const exam = {
                nome: exams[Math.floor(Math.random() * exams.length)],
                doutor: doctors[Math.floor(Math.random() * doctors.length)],
                preco: Math.random(320,900) * 100,
                plano_de_saude: healthInsurances[Math.floor(Math.random() * healthInsurances.length)],
                data: formattedDate
            }

            examList.push(exam);
        }

        startDate.setDate(startDate.getDate() + 1);
    }
    
    return examList;
}