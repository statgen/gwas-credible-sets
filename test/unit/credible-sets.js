import credibleSets from '../../src/credible-sets';

describe('credibleSets', () => {
    describe('Greet function', () => {
        beforeEach(() => {
            spy(credibleSets, 'greet');
            credibleSets.greet();
        });

        it('should have been run once', () => {
            expect(credibleSets.greet).to.have.been.calledOnce;
        });

        it('should have always returned hello', () => {
            expect(credibleSets.greet).to.have.always.returned('hello');
        });
    });
});
