
// Configuração do gráfico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sábado', 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [{
            label: 'Número de Tentativas',
            data: [],
            backgroundColor: 'rgba(555, 192, 392, 0.9)',
            borderColor: 'rgba(575, 92, 192)',
            borderRadius: 10,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Atualização das KPI's
function updateKPIs(correctPercentage, totalPlayers) {
    document.getElementById('correctPercentage').innerText = `${correctPercentage}%`;
    document.getElementById('totalPlayers').innerText = `${totalPlayers}`;
}

// Função para buscar dados do servidor
async function fetchQuizData() {
    try {
        const response = await fetch('http://localhost:3333/quizData'); 
        const data = await response.json();
        
        console.log('Dados recebidos:', data);
        
        const correctPercentage = data.correctPercentage;
        const totalPlayers = data.totalPlayers;
        
        let attemptsData;
        try {
            attemptsData = JSON.parse(data.attemptsData);
        } catch (e) {
            attemptsData = data.attemptsData;
        }

        console.log('Tentativas Diárias:', attemptsData);

        // Atualizar gráfico
        myChart.data.datasets[0].data = attemptsData;
        myChart.update();

        // Atualizar KPI's
        updateKPIs(correctPercentage, totalPlayers);
    } catch (error) {
        console.error('Erro ao buscar dados do quiz:', error);
    }
}

// Chame a função para buscar os dados ao carregar a página
document.addEventListener('DOMContentLoaded', (event) => {
    fetchQuizData();
});
