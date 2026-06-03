import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, CreditCard, FileText, Building, PiggyBank } from 'lucide-react';

const blueprintItems = [
  {
    id: 'ein',
    title: 'EIN (Employer Identification Number)',
    icon: FileText,
    button: 'Get Your EIN Free',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
    description: `A free business ID number from the IRS. Basically a Social Security Number for Pure Sole specifically.
Why it matters: Protects your personal SSN from suppliers, payment processors and customers. Makes Pure Sole a real recognized business entity.
When to get it: Get your EIN when Pure Sole hits $5,000 in total revenue.`,
  },
  {
    id: 'llc',
    title: 'LLC (Limited Liability Company)',
    icon: Building,
    button: 'Form Pure Sole LLC',
    url: 'https://www.sos.state.oh.us',
    description: `An LLC legally separates YOU from Pure Sole. Without it you and Pure Sole are the same thing legally.
When to get it: Form your LLC when Pure Sole hits $10,000 in total revenue.
Protection: Customer sues? They can only go after business assets, not your personal savings.`,
  },
  {
    id: 'scorp',
    title: 'S-Corp Election',
    icon: Shield,
    button: 'Learn About S-Corp',
    url: 'https://www.irs.gov',
    description: `When Pure Sole grows big enough you can elect S-Corp tax status which significantly reduces your self employment tax burden.
Consider when: Pure Sole consistently makes $50,000+ per year.
Savings: Potentially cut self-employment tax by half, saving $7,000+ per year.`,
  },
  {
    id: 'business-card',
    title: 'Business Credit Card',
    icon: CreditCard,
    button: 'Apply For Business Credit',
    url: 'https://www.businesscreditcards.com',
    description: `A credit card specifically for Pure Sole expenses that builds business credit history.
How it works: Buy product on business card, customer pays you, pay off card same day. Earn points on every transaction while building business credit.`,
  },
  {
    id: 'roth-ira',
    title: 'Roth IRA',
    icon: PiggyBank,
    button: 'Open Your Roth IRA',
    url: 'https://www.fidelity.com',
    description: `A retirement account where your money grows completely tax free forever. Pay taxes on money going IN but never on money coming OUT.
Max contribution: $7,000/year (2024). Start with as little as $1 at Fidelity.`,
  },
];

const AdminBlueprint: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-2">The Blueprint</h1>
      <p className="text-gray-500 mb-8">Your complete roadmap for protecting and growing Pure Sole as your business scales</p>

      <div className="space-y-6 mb-8">
        {blueprintItems.map(item => {
          const isOpen = expanded === item.id;
          const Icon = item.icon;
          return (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full bg-gray-50 hover:bg-gray-100 px-6 py-4 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <h3 className="font-bold text-lg text-left text-black">{item.title}</h3>
                </div>
                {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {isOpen && (
                <div className="p-6 bg-white space-y-4">
                  <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition text-sm"
                  >
                    {item.button}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-black mb-2">Timeline for Pure Sole Growth</h3>
        <p className="text-sm text-gray-700 mb-4">Use The Blueprint as a checklist as Pure Sole grows:</p>
        <div className="space-y-2 text-sm">
          <p><strong>📍 Start:</strong> Launch Pure Sole store</p>
          <p><strong>📍 $5,000:</strong> Get your EIN (protects your SSN)</p>
          <p><strong>📍 $10,000:</strong> Form your LLC (protects your personal assets)</p>
          <p><strong>📍 $50,000:</strong> Consider S-Corp election (save on self-employment tax)</p>
          <p><strong>💰 Ongoing:</strong> Roth IRA, Business Credit Card, High Yield Savings for wealth building</p>
        </div>
      </div>
    </div>
  );
};

export default AdminBlueprint;