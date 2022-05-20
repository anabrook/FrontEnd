import "./App.css";

import React, { useCallback, useEffect } from "react";

import Checkbox from "components/Checkbox/Index";
import data from "data.json";

interface Children {
  id: string;
  name: string;
  children: Array<Children>;
  checked: boolean | "indeterminate";
  level: number;
}

function App() {
  const [values, setValues] = React.useState<Array<Children>>([]);

  const ObjectToArray = (value: Object): Array<Children> => {
    return Object.values(value);
  };

  const procData = useCallback((input: Array<Children>) => {
    input.forEach((e) => {
      e.checked = false;
      //Verifica se possui o objeto children e que esse possui valores dentro
      if (Object.keys(e.children).length > 0) {
        e.children = ObjectToArray(e.children);
        procData(e.children);
      }
    });
    return input;
  }, []);

  useEffect(() => {
    const init = ObjectToArray(data);
    setValues(procData(init));
  }, [procData]);

  const updateState = (
    input: Children[],
    id: string,
    last: Children[],
    marked?: boolean | "indeterminate"
  ) => {
    for (let e of input) {
      let markFlag = undefined;
      //Verifica se possui o objeto children e que esse possui valores dentro
      if (marked !== undefined) {
        e.checked = marked;
      }
      if (e.id === id) {
        e.checked = !e.checked;
        markFlag = e.checked;
        if (last.length > 0) {
          last.forEach((lastValue) => {
            if (lastValue.level < e.level) {
              if (e.checked) {
                lastValue.checked = "indeterminate";
              } else {
                lastValue.checked = false;
              }
            }
          });
        }
      }
      if (e.children.length > 0) {
        last?.push(e);
        updateState(
          e.children,
          id,
          last,
          marked !== undefined ? marked : markFlag
        );
      }
    }
    return input;
  };

  const handleChange = (value: Children) => {
    setValues([...updateState(values, value.id, [])]);
  };

  const innerRender = (data: Children) => {
    return (
      data.children.length > 0 &&
      data.children.map((e, i) => (
        <div style={{ marginLeft: "2rem" }}>
          <Checkbox
            label={e.name}
            key={i}
            checked={e.checked}
            onChange={() => {
              handleChange(e);
            }}
          />
          {innerRender(e)}
        </div>
      ))
    );
  };

  const procRenderData = () => {
    return values.map((e, i) => {
      return (
        <>
          <Checkbox
            label={e.name}
            key={i}
            checked={e.checked}
            onChange={() => {
              handleChange(e);
            }}
          />
          {innerRender(e)}
        </>
      );
    });
  };

  // Fazer o loop até achar um children acha uma children cria uma divisória e renderiza

  return <div>{procRenderData()}</div>;
}

export default App;
