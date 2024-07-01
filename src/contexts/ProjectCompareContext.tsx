import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from "axios";

interface ProjectCompareContextValues {
  results: any;
  file: string|Blob;
  setFile: (file: string|Blob) => void;
  handleCSVUpload: () => void;
}

const ProjectCompareContext = createContext<ProjectCompareContextValues|null>(null)

const ProjectCompareProvider = ({ children } : { children: ReactNode}) => {
  const [file, setFile] = useState<string|Blob>('');
  const [results, setResults] = useState(null);

  const handleCSVUpload = () => {
    const formData = new FormData();
    formData.append('csv', file);

    // Send file to server for processing.
    axios.post('http://localhost:3030/process-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      // Store processed data.
      setResults(response.data);
    }).catch(error => {
      console.error('Error uploading file:', error);
    })
  }

  const providerValues = {
    results,
    file,
    setFile,
    handleCSVUpload
  }

  return (
    <ProjectCompareContext.Provider value={providerValues}>
      {children}
    </ProjectCompareContext.Provider>
  )
}

const useProjectCompare = () => {
  const context = useContext(ProjectCompareContext);
  if (!context) {
    throw Error('Use useProjectCompare in ProjectCompareProvider');
  }
  return context;
}

export { ProjectCompareContext, ProjectCompareProvider, useProjectCompare };
