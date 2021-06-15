import { Suite, SuiteFunction } from 'mocha';

export const then = it;
export const given = beforeEach;
export const when: SuiteFunction = <SuiteFunction>function (title: string, fn: (this: Suite) => void) {
  context('when ' + title, fn);
};
when.only = (title: string, fn?: (this: Suite) => void) => context.only('when ' + title, fn!);
when.skip = (title: string, fn: (this: Suite) => void) => context.skip('when ' + title, fn);
