import * as React from "react";
import { Box, Container, Header, SpaceBetween, FormField, Input, Button, ColumnLayout, Link } from "@cloudscape-design/components";
import Wizard from "@cloudscape-design/components/wizard";

export default () => {
    const [
        activeStepIndex,
        setActiveStepIndex
    ] = React.useState(0);
    return (
        <div>
            <p style={{paddingTop:'10px'}}> </p>
            <Wizard
                i18nStrings={{
                    stepNumberLabel: stepNumber =>
                        `Step ${stepNumber}`,
                    collapsedStepsLabel: (stepNumber, stepsCount) =>
                        `Step ${stepNumber} of ${stepsCount}`,
                    skipToButtonLabel: (step, stepNumber) =>
                        `Skip to ${step.title}`,
                    navigationAriaLabel: "Steps",
                    cancelButton: "Cancel",
                    previousButton: "Previous",
                    nextButton: "Next",
                    submitButton: "Launch instance",
                    optional: "optional"
                }}
                onNavigate={({ detail }) =>
                    setActiveStepIndex(detail.requestedStepIndex)
                }
                activeStepIndex={activeStepIndex}
                allowSkipTo
                steps={[
                    {
                        title: "Choose Date",
                        content: (
                            <Container
                                header={
                                    <Header variant="h2">
                                        Form container header
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="First field">
                                        <Input />
                                    </FormField>
                                    <FormField label="Second field">
                                        <Input />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        ),
                        isOptional: false
                    },
                    {
                        title: "Add description",
                        content: (
                            <Container
                                header={
                                    <Header variant="h2">
                                        Form container header
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="First field">
                                        <Input />
                                    </FormField>
                                    <FormField label="Second field">
                                        <Input />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        ),
                        isOptional: false
                    },
                    {
                        title: "Add address",
                        content: (
                            <Container
                                header={
                                    <Header variant="h2">
                                        Form container header
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="First field">
                                        <Input />
                                    </FormField>
                                    <FormField label="Second field">
                                        <Input />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        ),
                        isOptional: false
                    },
                    {
                        title: "Review and launch",
                        content: (
                            <SpaceBetween size="xs">
                                <Header
                                    variant="h3"
                                    actions={
                                        <Button
                                            onClick={() => setActiveStepIndex(0)}
                                        >
                                            Edit
                                        </Button>
                                    }
                                >
                                    Step 1: Instance type
                                </Header>
                                <Container
                                    header={
                                        <Header variant="h2">
                                            Container title
                                        </Header>
                                    }
                                >
                                    <ColumnLayout
                                        columns={2}
                                        variant="text-grid"
                                    >
                                        <div>
                                            <Box variant="awsui-key-label">
                                                First field
                                            </Box>
                                            <div>Value</div>
                                        </div>
                                        <div>
                                            <Box variant="awsui-key-label">
                                                Second Field
                                            </Box>
                                            <div>Value</div>
                                        </div>
                                    </ColumnLayout>
                                </Container>
                            </SpaceBetween>
                        )
                    }
                ]}
            />
        </div>
    );
}
