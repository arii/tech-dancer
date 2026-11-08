import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SpecsTable, VerdictCallout } from '@/components/layout/DetailElements';

describe('DetailElements', () => {
  it('renders VerdictCallout without surrounding literal quotes', () => {
    render(<VerdictCallout verdict="Affordable Chest-Strap Heart Rate Monitor" />);
    expect(screen.getByText('Affordable Chest-Strap Heart Rate Monitor')).toBeDefined();
    expect(screen.queryByText('"Affordable Chest-Strap Heart Rate Monitor"')).toBeNull();
  });

  it('renders SpecsTable with dl/dt/dd semantics', () => {
    const specs = {
      Type: 'Chest strap',
      Connectivity: 'Bluetooth + ANT+'
    };
    const { container } = render(<SpecsTable specs={specs} />);
    expect(container.querySelector('dl')).not.toBeNull();
    const dts = container.querySelectorAll('dt');
    expect(dts.length).toBe(2);
    expect(dts[0].textContent).toBe('Type');
    const dds = container.querySelectorAll('dd');
    expect(dds.length).toBe(2);
    expect(dds[0].textContent).toBe('Chest strap');
  });
});
