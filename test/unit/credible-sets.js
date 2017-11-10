import {greet} from '../../src/credible-sets';

describe('credibleSets', () => {
    describe('Greet function', () => {
        beforeEach(function () {
            this.greetSpy = spy(greet);
            this.greetSpy();
        });

        it('should have been run once', function () {
            expect(this.greetSpy).to.have.been.calledOnce;
        });

        it('should have always returned hello', function () {
            expect(this.greetSpy).to.have.always.returned('hello');
        });
    });
});
