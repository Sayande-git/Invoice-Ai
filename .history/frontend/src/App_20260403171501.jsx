

const App = () => {
  return (
   <div className="min-h-screen max-full overflow-x-hidden">
 <Routes>
      <Route path="/" element={<Home />} />

      {/* Example protected route */}
      <Route
        path="/app"
        element={
          <ClerkProtected>
          <AppShell/>
          </ClerkProtected>
        }
      />
      <Route index element={<Dashboard />}>
      <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
   </div>
};

export default App;
