import { of } from 'rxjs';
import { EjemploSalidaInterceptor } from './ejemplo-salida.interceptor';

interface Response<T> {
  modificado: T;
}

describe('EjemploSalidaInterceptor', () => {
  let interceptor: EjemploSalidaInterceptor<Response<string>>;

  beforeEach(() => {
    interceptor = new EjemploSalidaInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should be "data" into "{ modificado: data }"', (done: jest.DoneCallback) => {
    // Arrange
    const data = 'Hola Mundo';
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn()
    };

    const next = {
      handle: jest.fn().mockImplementation(() => of(data))
    };

    // Act
    interceptor.intercept(context, next).subscribe({
      next: (value) => {
        // Assert
        expect(value).toEqual({ modificado: data });
        done();
      }
    });
  });

  it('should not be "data" into "{ modificado: data }"', (done: jest.DoneCallback) => {
    // Arrange
    const data = 'Hola Mundo';
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn()
    };

    const next = {
      handle: jest.fn().mockImplementation(() => of(data))
    };

    // Act
    interceptor.intercept(context, next).subscribe({
      // Assert
      next: (value) => expect(value).not.toEqual({ modificado: data + '!' }),
      complete: () => done()
    });
  });
});
