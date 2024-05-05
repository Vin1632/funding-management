import React from "react";
import { render } from "@testing-library/react";
import Reviewapplications from "./Review-applications";
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe("Reviewapplications", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>);
    
    // Check if the section header is rendered
    // expect(getByText("Applications")).toBeInTheDocument();
    
    // // Check if the applicant name is rendered
    // expect(getByText("Applicant Name")).toBeInTheDocument();
    
    // // Check if the project name is rendered
    // expect(getByText("Project name")).toBeInTheDocument();
    
    // // Check if the approve button is rendered
    // expect(getByText("Approve")).toBeInTheDocument();
    
    // // Check if the reject button is rendered
    // expect(getByText("Reject")).toBeInTheDocument();
  });
});
