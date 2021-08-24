import { network } from 'hardhat';

export const advanceTimeAndBlock = async (time: number): Promise<void> => {
  await advanceTime(time);
  await advanceBlock();
};

export const advanceToTimeAndBlock = async (time: number): Promise<void> => {
  await advanceToTime(time);
  await advanceBlock();
};

export const advanceTime = async (time: number): Promise<void> => {
  await network.provider.request({
    method: 'evm_increaseTime',
    params: [time],
  });
};

export const advanceToTime = async (time: number): Promise<void> => {
  await network.provider.request({
    method: 'evm_setNextBlockTimestamp',
    params: [time],
  });
};

export const advanceBlock = async () => {
  await network.provider.request({
    method: 'evm_mine',
    params: [],
  });
};

export const reset = async (forking?: { [key: string]: any }) => {
  const params = forking ? [{ forking }] : [];
  await network.provider.request({
    method: 'hardhat_reset',
    params,
  });
};

export const takeSnapshot = async (): Promise<string> => {
  return (await network.provider.request({
    method: 'evm_snapshot',
    params: [],
  })) as string;
};

export const revertSnapshot = async (id: string) => {
  await network.provider.request({
    method: 'evm_revert',
    params: [id],
  });
};

export class SnapshotManager {
  snapshots: { [id: string]: string } = {};

  async take(): Promise<string> {
    const id = await takeSnapshot();
    this.snapshots[id] = id;
    return id;
  }

  async revert(id: string): Promise<void> {
    await revertSnapshot(this.snapshots[id]);
    this.snapshots[id] = await takeSnapshot();
  }
}
