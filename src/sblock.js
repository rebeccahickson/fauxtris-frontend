class sBlock extends TwoRotation {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateSBlock();
  }

  populateSBlock() {
    const blocksToAdd = {};
    const firstRowName = Object.keys(Gameplay.currentGame.board)[0];
    const secondRowName = Object.keys(Gameplay.currentGame.board)[1];

    for (let i = 3; i < 6; i++) {
      switch (i) {
        case 3:
          blocksToAdd[secondRowName] = [i];
          break;
        case 4:
          blocksToAdd[firstRowName] = [i];
          blocksToAdd[secondRowName].push(i);
          break;
        case 5:
          blocksToAdd[firstRowName].push(i);
          break;
      }
    }
    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
  }

  rotateFirst(activeBlocks, keys) {
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const leftIndex = activeBlocks[bottomRow][0];
    const centerIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[centerRow][1];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[bottomRow] = [leftIndex, centerIndex];
    blocksToAdd[topRow] = [centerIndex];
    blocksToAdd[bottomRow] = [rightIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const centerIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[centerRow][1];
    const leftIndex = centerIndex - 1;

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[bottomRow] = [rightIndex];
    blocksToRemove[topRow] = [centerIndex];
    blocksToAdd[bottomRow] = [leftIndex, centerIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
