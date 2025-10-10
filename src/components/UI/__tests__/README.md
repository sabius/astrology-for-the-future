# Component Tests

This directory contains unit tests for UI components, specifically focusing on the ResponsivePicture component and its integration with FeatureCard.

## Test Structure

### ResponsivePicture.test.ts
Comprehensive tests for the ResponsivePicture component, including:
- `createCloudinaryUrl` function tests (pure function testing)
- URL transformation logic
- Edge cases and error handling
- Integration scenarios
- Performance optimizations

### FeatureCard.test.ts
Integration tests for the FeatureCard component:
- Props validation
- ResponsivePicture integration
- Conditional rendering
- Accessibility compliance
- Component composition

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The tests cover:
- ✅ Happy path scenarios
- ✅ Edge cases
- ✅ Error conditions
- ✅ Type safety
- ✅ Integration scenarios
- ✅ Performance considerations
- ✅ Accessibility requirements

## Adding New Tests

When adding new tests, follow these guidelines:
1. Group related tests using `describe` blocks
2. Use descriptive test names that explain the expected behavior
3. Test both positive and negative cases
4. Mock external dependencies when necessary
5. Ensure tests are isolated and don't depend on each other