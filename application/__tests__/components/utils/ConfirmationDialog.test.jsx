import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ConfirmationDialog from '../../../src/components/utils/ConfirmationDialog';

describe('ConfirmationDialog', () => {
  it('opens the modal and calls onConfirm on confirmation', async () => {
    const onConfirmMock = jest.fn();
    const triggerText = 'Open Dialog';
    render(
      <ConfirmationDialog
        trigger={(onOpen) => <button onClick={onOpen}>{triggerText}</button>}
        onConfirm={onConfirmMock}
      />
    );

    // Open the modal
    userEvent.click(screen.getByText(triggerText));
    // Use findByText for elements that might not be immediately available
    const confirmationText = await screen.findByText('Are you sure?');
    expect(confirmationText).toBeInTheDocument();

    // Confirm the action
    const yesButton = await screen.findByText('Yes');
    await userEvent.click(yesButton);
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('closes the modal on cancel without calling onConfirm', async () => {
    const onConfirmMock = jest.fn();
    const triggerText = 'Open Dialog';
    render(
      <ConfirmationDialog
        trigger={(onOpen) => <button onClick={onOpen}>{triggerText}</button>}
        onConfirm={onConfirmMock}
      />
    );

    // Open the modal
    userEvent.click(screen.getByText(triggerText));
    const confirmationText = await screen.findByText('Are you sure?');
    expect(confirmationText).toBeInTheDocument();

    // Cancel the action
    const noButton = await screen.findByText('No');
    userEvent.click(noButton);

    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  it('displays custom body, yesText, and noText', async () => {
    const customBody = 'Do you want to proceed?';
    const customYes = 'Proceed';
    const customNo = 'Abort';
    render(
      <ConfirmationDialog
        trigger={(onOpen) => <button onClick={onOpen}>Open Custom Dialog</button>}
        onConfirm={() => {}}
        body={customBody}
        yesText={customYes}
        noText={customNo}
      />
    );

    // Open the modal
    userEvent.click(screen.getByText('Open Custom Dialog'));
    const customBodyText = await screen.findByText(customBody);
    expect(customBodyText).toBeInTheDocument();
    const proceedButton = await screen.findByText(customYes);
    expect(proceedButton).toBeInTheDocument();
    const abortButton = await screen.findByText(customNo);
    expect(abortButton).toBeInTheDocument();
  });
});