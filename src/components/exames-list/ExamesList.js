import React from 'react';

function renderPatient(data) {
  return data.map((item, index) => (
    <li key={index}>
      <strong>Paciente:</strong> {item.paciente.nome} <br />
      <strong>Tipo de Exame:</strong> {item.exame.tipo} <br />
      <strong>Data:</strong> {item.exame.data} <br />
      <strong>Funcionário Responsável:</strong> {item.exame.funcionarioResponsavel} <br />
      <strong>Valor Recebido:</strong> R$ {item.exame.valorRecebido.toFixed(2)}
    </li>
  ));
}

function renderEmpty() {
  return <span>no data</span>;
}

const ExamesList = (props) => {
  const { data } = props;
  return (
    <div>
      <h2>Lista de Exames Médicos</h2>
      <ul>{data ? renderPatient(data) : renderEmpty()}</ul>
    </div>
  );
};

export default ExamesList;
