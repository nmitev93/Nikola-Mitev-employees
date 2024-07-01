import React from "react";
import { useProjectCompare } from "../contexts/ProjectCompareContext";
import { isEmpty, get } from 'lodash/fp'
import { styled } from "styled-components";

const UploadFile = () => {
  const { setFile, handleCSVUpload } = useProjectCompare()

  return (
    <UploadForm onSubmit={event => {
      event.preventDefault();
      handleCSVUpload();
    }}>
      <div>Upload CSV file for processing</div>
      <input
        type="file"
        name="csvFile"
        accept=".csv"
        onChange={(event) => {
          const file = get('target.files[0]')(event)

          if (isEmpty(file)) {
            setFile(file)
          }
        }}
        required
      />
      <button type="submit">Process file</button>
    </UploadForm>
  )
}

const UploadForm = styled.form`
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  grid-gap: 1.25rem;
  border: solid 0.1rem darkgrey;
  border-radius: 0.6rem;
  padding: 1rem;
  max-height: 7.5rem;
  
  button {
    max-width: 10rem;
    background-color: lightsteelblue;
    border: solid 0.1rem grey;
    border-radius: inherit;
    place-self: center;
    width: 10rem;
    padding: 0.250rem;
  }
`;

export default UploadFile;
