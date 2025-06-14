import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaArrowLeft, FaEye, FaCheckCircle, FaClock, FaShieldAlt, FaTerminal, FaSyncAlt, FaDatabase, FaMicrochip, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import { FaBars } from 'react-icons/fa';

interface ApiKey {
  _id: string;
  repo: string;
  filename: string;
  vendor: string;
  key: string;
  isValid: boolean | null;
  createdAt: string;
  lastChecked: string;
  checkCount: number;
}

interface ApiResponse {
  data: ApiKey[];
  totalViews: {
    _id: string;
    views: number;
  };
}

// Add status color map for badges and text
function getStatusBadge(isValid: boolean | null) {
  if (isValid === true) {
    return { label: 'Verified', color: 'bg-success/10 text-success border-success/30', text: 'text-success' };
  }
  return { label: 'Processing', color: 'bg-warning/10 text-warning border-warning/30', text: 'text-warning' };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ApiKey[]>([]);
  const [filteredData, setFilteredData] = useState<ApiKey[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [vendorFilter, setVendorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalKey, setModalKey] = useState<ApiKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const API_URL = 'https://env-scanner.vercel.app/api/keys';

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ApiResponse = await response.json();
      setData(result.data);
      setTotalViews(result.totalViews.views);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      toast.error('Failed to load data from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fix: Remove duplicate/incorrect variable declarations and type errors
  // Use filteredData for vendor list
  const uniqueVendors = [...new Set(filteredData.map((item: ApiKey) => item.vendor))];

  // Filter to show only valid keys and those still processing (null)
  const validKeys = data.filter(item => item.isValid === true || item.isValid === null);

  const getStatusText = (isValid: boolean | null) => {
    if (isValid === true) return 'Verified';
    return 'Processing';
  };

  // Use the same vendor color map as LandingPage for consistency
  const vendorColors: Record<string, string> = {
    'OpenAI': 'bg-blue-700 text-blue-100 border-blue-500',
    'Hugging Face': 'bg-yellow-700 text-yellow-100 border-yellow-500',
    'Anthropic': 'bg-purple-700 text-purple-100 border-purple-500',
    'Replicate API': 'bg-pink-700 text-pink-100 border-pink-500',
    'OpenRouter API': 'bg-green-700 text-green-100 border-green-500',
    'Together AI API': 'bg-cyan-700 text-cyan-100 border-cyan-500',
    'Gemini API': 'bg-fuchsia-700 text-fuchsia-100 border-fuchsia-500',
    'GitHub Token': 'bg-gray-700 text-gray-100 border-gray-500',
    'Slack Token': 'bg-indigo-700 text-indigo-100 border-indigo-500',
    'SendGrid': 'bg-teal-700 text-teal-100 border-teal-500',
    'Stripe': 'bg-orange-700 text-orange-100 border-orange-500',
    'Stability AI': 'bg-red-700 text-red-100 border-red-500',
    'Postman': 'bg-lime-700 text-lime-100 border-lime-500',
    'Telegram Bot': 'bg-emerald-700 text-emerald-100 border-emerald-500',
  };

  const getVendorColor = (vendor: string) => vendorColors[vendor] || 'bg-zinc-800/60 text-zinc-200 border-zinc-500';

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.substring(0, 6)}${'•'.repeat(Math.min(key.length - 10, 20))}${key.substring(key.length - 4)}`;
  };

  useEffect(() => {
    let filtered = validKeys;

    // Filtering logic
    if (vendorFilter !== 'all') {
      filtered = filtered.filter(item => item.vendor === vendorFilter);
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => (statusFilter === 'verified' ? item.isValid === true : item.isValid === null));
    }

    setFilteredData(filtered);
  }, [data, vendorFilter, statusFilter]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Generate chart data from the last 7 days
  const generateChartData = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const keysOnDate = data.filter(item => {
        const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
        return itemDate === dateStr;
      }).length;
      
      last7Days.push({
        date: dateStr,
        keys: keysOnDate,
        displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    
    return last7Days;
  };

  const chartData = generateChartData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-primary font-mono">Initializing secure connection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <FaShieldAlt className="h-16 w-16 text-destructive mx-auto" />
          <p className="text-destructive font-mono">Connection failed: {error}</p>
          <Button onClick={fetchData} variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
            <FaSyncAlt className="h-4 w-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div
      className="min-h-screen h-full bg-background text-foreground transition-colors duration-300 overflow-x-hidden overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Responsive Navbar with Hamburger */}
      <header className="bg-background/80 border-b border-border sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-row justify-between items-center h-16 gap-2 w-full">
            {/* Left: Back button and title */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-primary/10 text-primary border border-primary/30"
              >
                <FaArrowLeft className="h-4 w-4 mr-2 text-primary" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="h-6 w-6 text-primary" />
                <span className="text-lg font-mono font-bold text-primary">EnvScanner</span>
              </div>
            </div>
            {/* Right: Hamburger for mobile, actions for desktop */}
            <div className="sm:hidden flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
                <FaBars className="h-6 w-6 text-primary" />
              </Button>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                onClick={fetchData}
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 text-primary"
              >
                <FaSyncAlt className="h-4 w-4 mr-2 text-primary" />
                REFRESH
              </Button>
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded border border-primary/30">
                <FaEye className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-primary">
                  VIEWS: {totalViews.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden flex flex-col gap-2 mt-2 bg-background border border-border rounded shadow-lg p-4 w-full animate-fade-in-up">
              <Button
                onClick={fetchData}
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 text-primary w-full justify-start"
              >
                <FaSyncAlt className="h-4 w-4 mr-2 text-primary" />
                REFRESH
              </Button>
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded border border-primary/30 w-full">
                <FaEye className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-primary">
                  VIEWS: {totalViews.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-success/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-mono text-success">VERIFIED_KEYS</CardTitle>
              <FaCheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold text-success" style={{color: 'hsl(var(--success))'}}>
                {data.filter((item: ApiKey) => item.isValid === true).length}
              </div>
              <p className="text-xs font-mono text-success/60">ACTIVE_THREATS</p>
              <span className="text-xs font-mono text-success font-semibold">Verified</span>
            </CardContent>
          </Card>
          <Card className="bg-card border-warning/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-mono text-warning">PROCESSING</CardTitle>
              <FaClock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold text-warning" style={{color: 'hsl(var(--warning))'}}>
                {data.filter((item: ApiKey) => item.isValid === null).length}
              </div>
              <p className="text-xs font-mono text-warning/60">PENDING_SCAN</p>
              <span className="text-xs font-mono text-warning font-semibold">Processing</span>
            </CardContent>
          </Card>
          <Card className="bg-card border-info/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-mono text-info">TOTAL_FOUND</CardTitle>
              <FaDatabase className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold text-info" style={{color: 'hsl(var(--info))'}}>{data.length}</div>
              <p className="text-xs text-info/60 font-mono">TOTAL_RECORDS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-purple-400/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-mono text-purple-400">VENDORS</CardTitle>
              <FaMicrochip className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold text-purple-400">{uniqueVendors.length}</div>
              <p className="text-xs text-purple-400/60 font-mono">UNIQUE_SOURCES</p>
            </CardContent>
          </Card>
        </div>
        {/* Chart */}
        <div className="mb-8">
          <Card className="bg-card border-primary/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary font-mono">
                <FaChartBar className="h-5 w-5" />
                <span>THREAT_DETECTION_TIMELINE</span>
              </CardTitle>
              <CardDescription className="text-primary/60 font-mono">
                Exposed credentials detected over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorKeys" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="displayDate" 
                    stroke="hsl(var(--primary))" 
                    fontSize={12}
                    fontFamily="monospace"
                  />
                  <YAxis 
                    stroke="hsl(var(--primary))" 
                    fontSize={12}
                    fontFamily="monospace"
                  />
                  <RechartsTooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '4px',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Area 
                    type="monotone"
                    dataKey="keys"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorKeys)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        {/* Table */}
        <div className="mb-8">
          <Card className="bg-card border-primary/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary font-mono">
                EXPOSED_CREDENTIALS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4 items-center">
                <div>
                  <label className="block text-xs font-mono mb-1">Vendor</label>
                  <Select value={vendorFilter} onValueChange={setVendorFilter}>
                    <SelectTrigger className="w-40 bg-card border border-border focus:ring-2 focus:ring-primary/40"> 
                      <SelectValue placeholder="All Vendors" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border shadow-lg"> 
                      <SelectItem value="all">All Vendors</SelectItem>
                      {Array.from(new Set(data.map(item => item.vendor))).map(vendor => (
                        <SelectItem key={vendor} value={vendor}>{String(vendor)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 bg-card border border-border focus:ring-2 focus:ring-primary/40">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border shadow-lg">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="verified">
                        <span className="text-success font-semibold">Verified</span>
                      </SelectItem>
                      <SelectItem value="processing">
                        <span className="text-warning font-semibold">Processing</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-mono font-semibold text-primary uppercase">Vendor</th>
                      <th className="px-4 py-2 text-left text-xs font-mono font-semibold text-primary uppercase">Key</th>
                      <th className="px-4 py-2 text-left text-xs font-mono font-semibold text-primary uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-mono font-semibold text-primary uppercase">Last Verified</th>
                      <th className="px-4 py-2 text-left text-xs font-mono font-semibold text-primary uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-2 text-center text-sm font-mono text-muted">
                          No exposed credentials found.
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item) => (
                        <tr key={item._id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-2 text-sm font-mono">
                            <Badge className={getVendorColor(item.vendor)}>{item.vendor}</Badge>
                          </td>
                          <td className="px-4 py-2 text-sm font-mono">
                            <span className="font-mono text-blue-400">{maskKey(item.key)}</span>
                          </td>
                          <td className="px-4 py-2 text-sm font-mono">
                            {(() => { const status = getStatusBadge(item.isValid); return (
                              <Badge className={status.color}>{status.label}</Badge>
                            ); })()}
                          </td>
                          <td className="px-4 py-2 text-sm font-mono">
                            <span className="font-mono">
                              {new Date(item.lastChecked).toLocaleString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm font-mono">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-primary text-primary hover:bg-primary/10"
                              onClick={() => { setModalOpen(true); setModalKey(item); }}
                            >
                              <FaEye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10 mr-2"
                    >
                      <FaArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm font-mono text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Modal for details */}
      {modalOpen && modalKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setModalOpen(false)}>&times;</button>
            <h2 className="text-lg font-bold mb-4">API Key Details</h2>
            {modalKey && <>
              <div className="mb-2"><span className="font-semibold">Vendor:</span> <Badge className={getVendorColor(modalKey.vendor)}>{modalKey.vendor}</Badge></div>
              <div className="mb-2"><span className="font-semibold">Status:</span> {(() => { const status = getStatusBadge(modalKey.isValid); return (<Badge className={status.color}>{status.label}</Badge>); })()}</div>
              <div className="mb-2"><span className="font-semibold">Key:</span> <span className="break-all font-mono bg-blue-950 text-blue-400 px-2 py-1 rounded select-all">{modalKey.key}</span></div>
              <div className="mb-2"><span className="font-semibold">File:</span> <span className="font-mono">{modalKey.filename}</span></div>
              <div className="mb-2"><span className="font-semibold">Repo:</span> <span className="font-mono">{modalKey.repo}</span></div>
              <div className="mb-2"><span className="font-semibold">Created:</span> <span className="font-mono">{new Date(modalKey.createdAt).toLocaleString()}</span></div>
              {modalKey.lastChecked && (
                <div className="mb-2"><span className="font-semibold">Last Checked:</span> <span className="font-mono">{new Date(modalKey.lastChecked).toLocaleString()}</span></div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => { if (modalKey) { navigator.clipboard.writeText(modalKey.key); toast.success('API key copied!'); } }}
                >
                  Copy Key
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="border-blue-700 text-blue-100 hover:bg-blue-900/30"
                  onClick={() => {
                    if (modalKey) {
                      let url = modalKey.repo;
                      if (!/^https?:\/\//.test(url)) {
                        url = `https://github.com/${url}`;
                      }
                      window.open(url, '_blank');
                    }
                  }}
                >
                  Visit Repo
                </Button>
              </div>
            </>}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;

