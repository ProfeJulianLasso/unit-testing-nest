import { EjemploGuard } from './ejemplo.guard';

describe('EjemploGuard', () => {
  let guard: EjemploGuard;

  beforeEach(() => {
    guard = new EjemploGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should be true', () => {
    // Arrange
    const token = '1234567890';
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn().mockImplementation(() => ({
        getRequest: jest.fn().mockImplementation(() => ({
          headers: {
            authorization: `Bearer ${token}`
          }
        }))
      })),
      switchToWs: jest.fn(),
      getType: jest.fn()
    };

    // Act
    const result = guard.canActivate(context);

    // Assert
    expect(result).toEqual(true);
  });

  it('should be false', () => {
    // Arrange
    const token = '-----';
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn().mockImplementation(() => ({
        getRequest: jest.fn().mockImplementation(() => ({
          headers: {
            authorization: `Bearer ${token}`
          }
        }))
      })),
      switchToWs: jest.fn(),
      getType: jest.fn()
    };

    // Act
    const result = guard.canActivate(context);

    // Assert
    expect(result).toEqual(false);
  });
});
