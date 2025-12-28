import { Component, useRef } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Form, {type FormHandle} from "./components/Form";

function App() {
  // const InputRef = useRef<HTMLInputElement>(null);
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: string };
    console.log("Saved Data:", extractedData);
    customForm.current?.clear()
  }
  return (
    <main>
      {/* <Input id="name" label="Name" type="text"/>
    <Input id="age" label="Age" type="number"/>
    <Button el="button" onClick={() => alert("Button clicked!")}>Click Me</Button>
    <Button el="anchor" href="https://www.example.com" target="_blank">Go to Example.com</Button> */}
      {/* <Component as={Button} /> */}

      {/* <Input id="name" label="Name" type="text" ref={InputRef}/> */}

      <Form onSave={handleSave} ref={customForm}>
        <Input type="text" label="Name" id="name" />
        <Input id="age" label="Age" type="number" />

        <p>
          <Button el="button">Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
