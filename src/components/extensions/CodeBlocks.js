import React, { useState } from "react";
import styled from "@emotion/styled";

const StickyWrapper = styled.div`
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 110px);
  min-height: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  pre {
    max-width: 100%;
    overflow: auto;
    height: 100%;
    border-radius: 6px;
    margin: 0;
  }
`;

const CodeResponseWrapper = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background-color: #f1f6f8;
  min-height: 0;
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
  max-width: 100%;

  & .gatsby-highlight {
    min-height: 0;
  }
  & pre {
    min-height: 0;
  }
`;

const CodeSampleWrapper = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background-color: #4f566b;
  color: white;
  margin: 0 0 20px;
  max-width: 100%;

  --code-color: #f5fbff;
  --code-background: #4f566b;
  --code-string-color: #56d4bc;
`;

const CodeSampleTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  background-color: #3c4150;
  border-radius: 8px 8px 0 0;
  color: #dee5e8;
  code {
    font-size: 12px;
    max-width: 100%;
  }
`;

const ResponseTopbar = styled.div`
  display: flex;
  padding: 5px 15px;
  background-color: #dee5e8;
  border-radius: 8px 8px 0 0;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Body = styled.div`
  min-height: 0;
  display: flex;
  max-width: 100%;
`;

const SelectLanguage = styled.select`
  padding: 4px;
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  color: #dee5e8;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  outline: 0;
  white-space: nowrap;
`;

export const Sample = styled.div`
  max-width: 100%;
`;

export const Section = styled.section`
  display: flex;
  max-width: 1400px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CodeWrapper = styled.div`
  width: 100%;
  flex-basis: 100%;

  flex-shrink: 0;
  flex-grow: 1;

  @media (min-width: 768px) {
    flex-basis: 410px;
    max-width: 410px;
    padding: 80px 0 30px 25px;
  }

  @media (min-width: 1200px) {
    flex-basis: 460px;
    max-width: 460px;
    padding: 80px 0 30px 25px;
  }
`;

export const Text = styled.div`
  flex-grow: 2;
  max-width: 100%;
  overflow-x: auto;
`;

export const FixedTdWidth = styled.div`
  th:first-child,
  td:first-child {
    width: 200px;
  }
`;

export const CodeSample = ({ path, children }) => {
  const childrenArray = React.Children.toArray(children);
  const count = React.Children.count(children);
  const [sample, setSample] = useState(childrenArray[0].props.label);
  const selectedChild = childrenArray.filter(
    ({ props }) => props.label === sample
  );

  return (
    <CodeSampleWrapper>
      {path && (
        <CodeSampleTopbar>
          <code>{path}</code>
          {count > 1 && (
            <SelectLanguage onChange={e => setSample(e.target.value)}>
              {childrenArray.map(children => (
                <option key={children.props.label}>
                  {children.props.label}
                </option>
              ))}
            </SelectLanguage>
          )}
        </CodeSampleTopbar>
      )}
      <Body>{selectedChild}</Body>
    </CodeSampleWrapper>
  );
};

export const CodeResponse = ({ title = "Response", children }) => {
  return (
    <CodeResponseWrapper>
      {title && <ResponseTopbar>{title}</ResponseTopbar>}
      <Body>{children}</Body>
    </CodeResponseWrapper>
  );
};

export const Code = ({ children }) => (
  <CodeWrapper>
    <StickyWrapper>{children}</StickyWrapper>
  </CodeWrapper>
);
