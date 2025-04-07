import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "../../../Button/ButtonCommon";
import { Spinner } from "../../../Spinner/SpinnerCommon";
import { ItemMessage } from "../../ItemMessage/ItemMessageCommon";
import { FileUpload } from "../FileUploadApollo";

describe("FileUpload", () => {
  const label = "Upload File";
  const buttonLabel = "Add file";
  const fileName1 = "file1.txt";
  const fileName2 = "file2.txt";
  const filesListLabel = "My Files";
  const dropzoneDescription = "Drop files here!";
  const instructions = "Some instructions";
  const globalError = "Global error!";
  const fileError = "File error!";

  const defaultProps = {
    id: "file-upload-test",
    label,
    buttonLabel,
    ButtonComponent: Button,
    SpinnerComponent: Spinner,
    ItemMessageComponent: ItemMessage,
  };

  const files = [
    { id: "1", name: fileName1, size: 1200, isLoading: false },
    { id: "2", name: fileName2, size: 2400, isLoading: true },
  ];

  it("renders label and button", () => {
    render(<FileUpload {...defaultProps} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(buttonLabel)).toBeInTheDocument();
  });

  it("renders files and calls onView/onDelete", () => {
    const onView = vi.fn();
    const onDelete = vi.fn();
    render(
      <FileUpload
        {...defaultProps}
        files={files}
        onView={onView}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText(fileName1)).toBeInTheDocument();
    expect(screen.getByText(fileName2)).toBeInTheDocument();

    const viewButtons = screen.getAllByLabelText("Visualiser");
    fireEvent.click(viewButtons[0]);
    expect(onView).toHaveBeenCalledWith("1");

    const deleteButtons = screen.getAllByLabelText("Supprimer");
    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith("2");
  });

  it("shows file errors and global error", () => {
    const errors = [{ id: "1", message: fileError }];
    render(
      <FileUpload
        {...defaultProps}
        files={files}
        errors={errors}
        globalError={globalError}
      />,
    );

    expect(screen.getByText(fileError)).toBeInTheDocument();
    expect(screen.getByText(globalError)).toBeInTheDocument();
  });

  it("shows required asterisk", () => {
    render(<FileUpload {...defaultProps} required />);

    expect(screen.getByText(`${label} *`)).toBeInTheDocument();
  });

  it("renders dropzoneDescription", () => {
    render(
      <FileUpload
        {...defaultProps}
        dropzoneDescription={dropzoneDescription}
      />,
    );

    expect(screen.getByText(dropzoneDescription)).toBeInTheDocument();
  });

  it("renders instructions", () => {
    render(<FileUpload {...defaultProps} instructions={instructions} />);

    expect(screen.getByText(instructions)).toBeInTheDocument();
  });

  it("renders filesListLabel", () => {
    render(
      <FileUpload
        {...defaultProps}
        files={files}
        filesListLabel={filesListLabel}
      />,
    );

    expect(screen.getByText(filesListLabel)).toBeInTheDocument();
  });

  it("passes accept prop to input", () => {
    render(<FileUpload {...defaultProps} accept=".pdf" />);

    expect(screen.getByLabelText(label)).toHaveAttribute("accept", ".pdf");
  });

  it("renders spinner when file is loading", () => {
    const loadingFiles = [
      { id: "1", name: fileName1, size: 1200, isLoading: true },
    ];
    render(<FileUpload {...defaultProps} files={loadingFiles} />);

    expect(screen.getByLabelText("Chargement en cours")).toBeInTheDocument();
  });

  it("renders success icon when file is uploaded successfully", () => {
    render(<FileUpload {...defaultProps} files={files} />);

    expect(screen.getByLabelText("succés")).toBeInTheDocument();
  });

  it("renders error icon when file is in error", () => {
    const errors = [{ id: "1", message: fileError }];
    render(<FileUpload {...defaultProps} files={files} errors={errors} />);

    expect(screen.getByLabelText("erreur")).toBeInTheDocument();
  });

  it("shouldn't have an accessibility violation", async () => {
    const { container } = render(<FileUpload {...defaultProps} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
