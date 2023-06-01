// Show plugin UI
figma.showUI(__html__, {
    width: 350,
    height: 510,
    title: 'Color Tint Generator',
});

// Message
figma.ui.onmessage = (msg) => {
    if (msg.type === 'actionGenerate') {
        // Destructure data from message object
        const {
            circleSize,
            circleSpacing,
            colorCode,
            colorName,
            frameDirection,
            tintNumber,
        } = msg.formDataObj;

        // Create a new frame
        const parentFrame = figma.createFrame();
        parentFrame.name = `Tints for ${colorName}`;

        // Set the frame position and layout direction
        parentFrame.layoutMode = frameDirection.toUpperCase();
        parentFrame.paddingLeft = 64;
        parentFrame.paddingRight = 64;
        parentFrame.paddingTop = 64;
        parentFrame.paddingBottom = 64;

        parentFrame.itemSpacing = parseInt(circleSpacing);

        parentFrame.primaryAxisSizingMode = 'AUTO';
        parentFrame.counterAxisSizingMode = 'AUTO';

        // Generate tints as ellipses
        for (let i = 0; i < tintNumber; i++) {
            // Create a new ellipse
            const tintNode = figma.createEllipse();
            tintNode.name = `${colorName} ${100 - i * 10}`;
            tintNode.resize(parseInt(circleSize), parseInt(circleSize));
            tintNode.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
        }

        // Close the plugin
        figma.closePlugin('Tints generated successfully');
    } else if (msg.type === 'actionExit') {
        // Close the plugin
        figma.closePlugin('Plugin cancelled');
    }
};
