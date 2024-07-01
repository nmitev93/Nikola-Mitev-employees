import React from 'react';
import './App.css';
import { ProjectCompareProvider } from "./contexts/ProjectCompareContext";
import UploadFile from "./components/upload_file";
import DataGrid from "./components/data-grid";
import { styled } from "styled-components";

function App() {
  return (
    <PageWrapper className="App">
      <ProjectCompareProvider>
        <PageHeader>
          Project compare
        </PageHeader>
        <ProjectCompareWrapper>
          <UploadFile />
          <DataGrid />
        </ProjectCompareWrapper>
      </ProjectCompareProvider>
    </PageWrapper>
  );
}

const PageHeader = styled.h1`

`

const ProjectCompareWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 0.5rem;
  padding: 1.5rem;
  height: 20rem;
`;

const PageWrapper = styled.div`
  padding: 1rem;
`

export default App;
