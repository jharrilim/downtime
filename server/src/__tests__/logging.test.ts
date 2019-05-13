import { LoggerFactory } from '../logging';
import { Logger } from 'winston';
import { Inject } from 'typedi';

describe('Logging', () => {
    describe('LoggerFactory', () => {
        it('is injectable', () => {
            class Foo {
                @Inject(type => LoggerFactory)
                public logger!: LoggerFactory;
            }
            expect(new Foo().logger).toBeTruthy();
        })
    })
})