import { expect } from 'chai';

describe('Testing mocha', () => {
  it('One to be zero', () => {
    expect(0).to.equal(0);
  });

  it('The sum of 1 + 1', () => {
    expect(1 + 1).to.equal(3);
  });
});
