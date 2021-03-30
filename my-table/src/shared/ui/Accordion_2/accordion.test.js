import React from "react";
import rerender from 'react-test-renderer';
import { Accordion2 } from './index'

it.skip("Modal has rendered correctly", () => {
  const tree = rerender.create(<Accordion2 dataTabs={[{tabName : "name", component : <div>div</div>}]}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
