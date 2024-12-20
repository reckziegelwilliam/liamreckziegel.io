export const calculatePathDimensions = (progress: number, windowWidth: number) => {
  const maxHeight = window.innerHeight;
  const expansionProgress = Math.min(1, (progress / 15));
  
  return {
    width: windowWidth,
    height: maxHeight * 0.7,
    scale: expansionProgress,
    opacity: Math.min(1, progress / 10)
  };
};


export const calculateTunnelCircle = (index: number, progress: number, windowWidth: number) => {
  const tunnelDelay = Math.max(0, progress - 5);
  const tunnelProgress = Math.min(1, tunnelDelay / 10);
  
  // Base scale for containing circles within path
  const pathScale = Math.min(1, (progress / 15));
  const maxWidth = windowWidth * pathScale;
  
  // Progressive spacing without affecting intensity
  const baseSpacing = 40;
  const spacingGrowth = 1.2 + (progress * 0.002);
  const spacing = baseSpacing * Math.pow(spacingGrowth, index);
  const depth = -spacing - (progress * 15);
  
  // Consistent base size with subtle depth scaling
  const baseSize = Math.min(10, maxWidth * 0.015);
  const size = baseSize * (1 + (Math.abs(depth) * 0.0003));
  
  // Consistent opacity and color intensity based only on distance
  const distanceFactor = Math.max(0, 1 - (index * 0.03));
  const opacity = tunnelProgress * distanceFactor * 0.6;
  const colorIntensity = Math.max(0.3, 1 - (index * 0.03));
  
  return {
    size,
    depth,
    opacity,
    colorIntensity
  };
};

export const calculateCardState = (index: number, scrollProgress: number) => {
  const cardTransitionSpace = 25; // Each card gets 25% of scroll
  const cardStart = index * cardTransitionSpace;
  const cardMid = cardStart + (cardTransitionSpace / 2);
  const cardEnd = cardStart + cardTransitionSpace;
  
  // Calculate where in the card's transition we are
  const cardProgress = Math.max(0, Math.min(100, 
    ((scrollProgress - cardStart) / cardTransitionSpace) * 100
  ));

  // Different phases of card animation
  const isEntering = cardProgress < 33;
  const isCenter = cardProgress >= 33 && cardProgress < 66;
  const isExiting = cardProgress >= 66;

  // Calculate scale based on phase
  let scale = 1;
  if (isEntering) {
    scale = 0.5 + (cardProgress / 33) * 0.5;
  } else if (isCenter) {
    scale = 1 + ((cardProgress - 33) / 33) * 0.2;
  } else if (isExiting) {
    scale = 1.2 - ((cardProgress - 66) / 34) * 0.7;
  }

  // Calculate position
  const baseOffset = 300;
  let horizontalOffset = 0;
  let verticalOffset = 0;
  let depth = 0;

  if (isEntering) {
    horizontalOffset = baseOffset - (cardProgress / 33) * baseOffset;
    depth = -1000 + (cardProgress / 33) * 500;
  } else if (isCenter) {
    horizontalOffset = 0;
    depth = -500;
  } else if (isExiting) {
    horizontalOffset = -((cardProgress - 66) / 34) * baseOffset;
    depth = -500 - ((cardProgress - 66) / 34) * 500;
  }

  return {
    scale,
    horizontalOffset,
    verticalOffset,
    depth,
    opacity: cardProgress > 0 && cardProgress < 100 ? 1 : 0,
    zIndex: isCenter ? 50 : 40
  };
};
