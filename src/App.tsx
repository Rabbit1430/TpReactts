import { useState } from 'react';

// Сюда можно какие хочешь написать парметры
enum ParamType {
  String = 'string',
  Number = 'number',
  
}


interface Param {
  id: number;
  name: string;
  type: ParamType; 
}


interface ParamValue {
  paramId: number;
  value: string;
}


interface Model {
  paramValues: ParamValue[];
}


function MyParam({ params, model }: { params: Param[], model: Model }) {
  const [paramdata, setparamdata] = useState<{ [paramId: number]: string }>(() => {
    const dataparametry: { [paramId: number]: string } = {};
    
    model.paramValues.forEach((paramvalue) => {
      dataparametry[paramvalue.paramId] = paramvalue.value;
    });
    return dataparametry;
  });

  const [mymodel, setmymodel] = useState<Model | ''>();

 
  const updatedata = (paramId: number, value: string) => {
    setparamdata((item) => ({
      ...item,
      [paramId]: value,
    }));
    
  };

  const getModel = () => {
    const newdataparam: ParamValue[] = [];
    for (const paramId in paramdata) {
      newdataparam.push({
        paramId: parseInt(paramId),
        value: paramdata[paramId],
      });
    }
    return {
      paramValues: newdataparam,
    };
  };

  
  const getdata = () => {
    const newdata = getModel();
    setmymodel(newdata);

    
  };


  return (
    <div>
      {params.map((param) => (
        <div key={param.id}>
          <span>{param.name}:</span>
          {param.type === ParamType.String && (
            <input
              type="text"
              id={`param-${param.id}`}
              value={paramdata[param.id] || ''}
              onChange={(e) => updatedata(param.id, e.target.value)}
            />
          )}
          {param.type === ParamType.Number && (
            <input
              type="number"
              id={`param-${param.id}`}
              value={paramdata[param.id] || ''}
              onChange={(e) => updatedata(param.id, e.target.value)}
            />
          )}
           <div>{paramdata[param.id]}</div>
        </div>
      ))}
       <button onClick={getdata}>Получить модель</button>
       <div>
          <h3>Полученная модель:</h3>
          <pre>{JSON.stringify(mymodel)}</pre>
        </div>
        {mymodel && (
          <div>
                {mymodel.paramValues.map((param)=> (
<div key={param.paramId}>{param.value}</div>

                ))}

        
          </div>
      
        )}
    </div>
  );
}

function App() {
  
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: ParamType.String },
    { id: 2, name: 'Длина', type: ParamType.String },
    
    { id: 3, name: 'Цена', type: ParamType.Number },
   
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
      { paramId: 3, value: '100' }, 
    
    ]
  };

 
  return (
    <div>
      <h2>Редактирование товара</h2>
      <MyParam params={params} model={model} />
    </div>
  );
}

export default App;
