import { execSync } from 'child_process';

export const query = (sql) => {
  try {
    const output = execSync(`team-db "${sql.replace(/"/g, '\\"')}"`);
    return JSON.parse(output.toString());
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export default { query };
