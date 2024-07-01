import React, {useEffect, useState} from "react";
import {useProjectCompare} from "../contexts/ProjectCompareContext";
import {isEmpty, map, orderBy} from "lodash/fp";
import { styled } from "styled-components";

const DataGrid = () => {
  const { results, file} = useProjectCompare();
  const [data, setData] = useState(results)

  useEffect(() => {
    setData(results);
  }, [results]);

  const handleSortClick = (sortItem: string) => {
    const sorted = orderBy(sortItem, ["asc"])(data)
    setData([...sorted])
  }

  return (
    <GridWrapper>
      {
        isEmpty(data) && isEmpty(file) &&
          <Message>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: "1.5rem", width: "1.5rem", paddingRight: "0.6rem", verticalAlign: "middle" }}>
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
            Please upload CSV file for processing
          </Message>
      }
      {
        isEmpty(data) ?
          <>
            {
              !isEmpty(file) &&
              <ErrorMessage>
                There are no employees which have worked together
              </ErrorMessage>
            }
          </> :
          <ResultsTable>
            <ResultLine>
              <div onClick={() => handleSortClick("employee")}>Employee ID #1</div>
              <div onClick={() => handleSortClick("employee2")}>Employee ID #2</div>
              <div onClick={() => handleSortClick("projectId")}>Project ID</div>
              <div onClick={() => handleSortClick("workTogether")}>Days worked</div>
            </ResultLine>
            {
              map((result:any) => {
                return (
                  <ResultLine key={`${result.projectId}-${result.employee}-${result.employee2}`}>
                    <div>{result.employee}</div>
                    <div>{result.employee2}</div>
                    <div>{result.projectId}</div>
                    <div>{result.workTogether}</div>
                  </ResultLine>
                )
              })(data)
            }
            <span>Clicking on the labels in header will order the items in ascending order.</span>
          </ResultsTable>
      }
    </GridWrapper>
  )
}

const GridWrapper = styled.div`
  justify-self: center;
`

const ResultsTable = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 0.6rem;
  font-size: 1.3rem;
  width: max-content;
  
  span {
    font-size: 0.9rem;
  }
`

const ResultLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1.2rem;
  border-bottom: solid 0.15rem lightgrey;
  padding-bottom: 0.2rem
`

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  color: red;
  opacity: 85%;
`

const Message = styled.div`
  font-size: 1.5rem;
  background-color: lightskyblue;
  padding: 0.75rem;
  border-radius: 0.6rem;
  opacity: 80%;
  vertical-align: middle;
`

export default DataGrid;
