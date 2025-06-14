import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FaShieldAlt, 
  FaSearch, 
  FaBolt, 
  FaGithub, 
  FaExclamationTriangle, 
  FaBrain, 
  FaUser, 
  FaChevronRight,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaMicrochip,
  FaLock,
  FaEye,
  FaCode,
  FaSkull,
  FaLinkedin // Added LinkedIn icon
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Add a color map for vendors
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

  // Assign unique colors to each feature card
  const features = [
    {
      icon: <FaGithub className="h-8 w-8 text-blue-400" />,
      title: "Repository Infiltration",
      description: "Deep scanning of public repositories to identify exposed API keys and sensitive credentials across the GitHub ecosystem.",
      cardClass: "bg-blue-900/40 border-blue-500/40",
      iconBg: "bg-blue-800/30 border-blue-400/40 text-blue-300"
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-pink-400" />,
      title: "Pattern Recognition",
      description: "Advanced regex patterns and entropy analysis to detect various API key formats from different service providers with precision.",
      cardClass: "bg-pink-900/40 border-pink-500/40",
      iconBg: "bg-pink-800/30 border-pink-400/40 text-pink-300"
    },
    {
      icon: <FaBrain className="h-8 w-8 text-green-400" />,
      title: "Entropy Analysis",
      description: "Intelligent filtering using entropy calculations to reduce false positives and identify genuine secrets with high accuracy.",
      cardClass: "bg-green-900/40 border-green-500/40",
      iconBg: "bg-green-800/30 border-green-400/40 text-green-300"
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-yellow-400" />,
      title: "Vendor Detection",
      description: "Automatic identification and classification of key vendors including OpenAI, Hugging Face, Telegram, Discord, and more.",
      cardClass: "bg-yellow-900/40 border-yellow-500/40",
      iconBg: "bg-yellow-800/30 border-yellow-400/40 text-yellow-300"
    }
  ];

  // Updated vendor/regex list for display
  const vendors = [
    { name: 'OpenAI' },
    { name: 'Hugging Face' },
    { name: 'Anthropic' },
    { name: 'Replicate API' },
    { name: 'OpenRouter API' },
    { name: 'Together AI API' },
    { name: 'Gemini API' },
    { name: 'GitHub Token' },
    { name: 'Slack Token' },
    { name: 'SendGrid' },
    { name: 'Stripe' },
    { name: 'Stability AI' },
    { name: 'Postman' },
    { name: 'Telegram Bot' },
  ];

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <motion.div
      className="min-h-screen h-full bg-background text-foreground font-sans transition-colors duration-300 overflow-x-hidden overflow-y-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navigation */}
      {/* Responsive Navbar for LandingPage */}
      <nav className="bg-background/80 border-b border-border fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Left: Title always visible */}
            <div className="flex items-center gap-2 min-w-0">
              <FaRobot className="h-8 w-8 text-primary shrink-0" />
              <span className="truncate text-xl font-mono font-bold text-primary">EnvScanner</span>
            </div>
            {/* Hamburger for mobile, actions for desktop */}
            <div className="flex items-center">
              <div className="sm:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
                  <FaChevronRight className={`h-6 w-6 text-primary transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                </Button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-primary/20 hover:bg-primary/30 border border-primary/30 font-mono text-primary px-3 py-2 text-sm"
                >
                  <FaEye className="mr-2 h-4 w-4" />
                  ACCESS_TERMINAL
                  <FaChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden flex flex-col gap-2 mt-2 bg-background border border-border rounded shadow-lg p-4 w-full animate-fade-in-up">
              <Button 
                onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                className="bg-primary/20 hover:bg-primary/30 border border-primary/30 font-mono text-primary px-3 py-2 text-sm w-full justify-start"
              >
                <FaEye className="mr-2 h-4 w-4" />
                ACCESS_TERMINAL
                <FaChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-2 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <FaSkull className="h-20 w-20 text-green-400" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-mono font-bold text-primary mb-6"
            variants={itemVariants}
          >
            <span className="text-destructive">[</span>
            envscanner
            <span className="text-destructive">]</span>
            <br />
            <span className="text-2xl md:text-3xl text-primary/80">
              SECURITY_BREACH_MONITOR
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg text-primary/80 mb-8 max-w-3xl mx-auto leading-relaxed font-mono"
            variants={itemVariants}
          >
            Advanced detection and monitoring of exposed API keys and sensitive credentials in public repositories. 
            <br />
            <span className="text-destructive">WARNING:</span> Protecting developers from accidental secret exposure.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-success/20 hover:bg-success/30 text-success border border-success/30 text-lg px-8 py-6 font-mono"
            >
              <FaRobot className="mr-2 h-5 w-5" />
              INITIATE_SCAN
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-warning/30 text-warning hover:bg-warning/10 font-mono"
            >
              <FaExclamationTriangle className="mr-2 h-5 w-5" />
              READ_WARNINGS
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-2 sm:px-4 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-primary mb-4">
              <span className="text-destructive">[</span>SYSTEM_CAPABILITIES<span className="text-destructive">]</span>
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto font-mono">
              Advanced security monitoring with military-grade detection algorithms
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`h-full ${feature.cardClass} border-primary/20 backdrop-blur-sm hover:border-primary/50 transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-3 rounded border w-fit ${feature.iconBg}`}>{feature.icon}</div>
                    <CardTitle className="text-lg font-mono" style={{color: 'inherit'}}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-primary/60 font-mono text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Algorithm Theory Section */}
      <section className="py-16 px-2 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-primary mb-4">
              <span className="text-destructive">[</span>ALGORITHM_THEORY<span className="text-destructive">]</span>
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto font-mono">
              Understanding the science behind credential detection
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-gray-900/50 border-info/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FaBolt className="h-6 w-6 text-info" />
                    <CardTitle className="text-info font-mono">ENTROPY_ANALYSIS</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-info/80 font-mono text-sm">
                    Calculates the randomness of strings to distinguish between genuine API keys 
                    and random text, reducing false positives through statistical analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-gray-900/50 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FaCode className="h-6 w-6 text-purple-400" />
                    <CardTitle className="text-purple-400 font-mono">REGEX_PATTERNS</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-400/80 font-mono text-sm">
                    Advanced regular expressions specifically designed to match API key formats 
                    from various service providers with high accuracy and minimal false positives.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-gray-900/50 border-success/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FaRobot className="h-6 w-6 text-success" />
                    <CardTitle className="text-success font-mono">REAL_TIME_SCAN</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-success/80 font-mono text-sm">
                    Real-time monitoring of repository events and commits to detect newly 
                    exposed credentials as they are pushed to public repositories.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Supported Vendors */}
      <section className="py-16 px-2 sm:px-4 lg:px-8 bg-card transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-primary mb-4">
              <span className="text-destructive">[</span>TARGET_VENDORS<span className="text-destructive">]</span>
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto font-mono">
              Detection patterns for major API providers and services
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
          >
            {vendors.map((vendor, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className={`text-sm px-4 py-2 font-mono border ${vendorColors[vendor.name] || 'bg-gray-700 text-gray-100 border-gray-500'}`}>
                  {vendor.name.toUpperCase().replace(/ /g, '_')}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section className="py-16 px-2 sm:px-4 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-primary mb-4">
              <span className="text-destructive">[</span>DEVELOPER: Imran Pasha<span className="text-destructive">]</span>
            </h2>
          </motion.div>
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-8">
              {/* You can add an avatar or a relevant icon here if you like */}
              <FaUser className="h-24 w-24 text-primary/70 border-2 border-primary/50 rounded-full p-2" />
            </div>
            <p className="text-lg text-primary/80 mb-6 leading-relaxed font-mono">
              Cybersecurity researcher and developer focused on API security and credential protection. Passionate about building tools that help the developer community stay secure.
            </p>
            <p className="text-lg text-primary/80 mb-8 leading-relaxed font-mono">
              With expertise in security analysis, pattern recognition, and automated monitoring systems, this project represents a commitment to improving overall API security awareness.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="text-md font-mono border-accent text-accent px-4 py-2">SECURITY_RESEARCHER</Badge>
              <Badge variant="outline" className="text-md font-mono border-accent text-accent px-4 py-2">FULL_STACK_DEV</Badge>
            </div>
            <a 
              href="https://www.linkedin.com/in/imranpasha636/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-primary hover:text-primary/80 transition-colors duration-300 bg-primary/10 hover:bg-primary/20 border border-primary/30 px-6 py-3 rounded-md font-mono text-lg"
            >
              <FaLinkedin className="mr-3 h-6 w-6" />
              Connect on LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-2 sm:px-4 lg:px-8 bg-red-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants}>
            <Card className="border-destructive/30 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded border border-destructive/30 w-fit">
                  <FaExclamationTriangle className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl text-destructive font-mono">CRITICAL_WARNING</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-900/20 p-6 rounded border border-destructive/30">
                  <h3 className="font-mono font-semibold text-destructive mb-2">EDUCATIONAL_PURPOSE_ONLY</h3>
                  <p className="text-destructive/80 font-mono text-sm">
                    This tool is designed for educational and research purposes to raise awareness about API security.
                  </p>
                </div>
                <div className="bg-orange-900/20 p-6 rounded border border-warning/30">
                  <h3 className="font-mono font-semibold text-warning mb-2">USER_RESPONSIBILITY</h3>
                  <p className="text-warning/80 font-mono text-sm">
                    Users are fully responsible for any misuse of discovered credentials. Unauthorized access to systems is illegal.
                  </p>
                </div>
                <div className="bg-green-900/20 p-6 rounded border border-success/30">
                  <h3 className="font-mono font-semibold text-success mb-2">RESPONSIBLE_DISCLOSURE</h3>
                  <p className="text-success/80 font-mono text-sm">
                    We encourage users to report findings to developers or vendors through proper channels to help resolve security exposures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-2 sm:px-4 lg:px-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaRobot className="h-6 w-6 text-primary" />
            <span className="text-lg font-mono font-semibold text-primary">EnvScanner</span>
          </div>
          <p className="text-primary/60 font-mono text-sm">
            © 2025 EnvScanner. Built for security awareness and education.
          </p>
          <p className="text-destructive/60 font-mono text-xs mt-2">
            [WARNING] Use responsibly. Unauthorized access is prohibited.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;