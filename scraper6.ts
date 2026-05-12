                      {filter.replace('-', ' ')}
                    </Text>
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
        </Stack>
      </Box>

      <Grid cols={{ base: 1, lg: 3 }} gap={8}>
        <Stack gap={8} className="lg:col-span-2">
          <Grid cols={{ base: 1, md: 2 }} gap={8}>
            <ScoreDistributionChart data={scoreDistribution} />
            <AvgScoreTrendChart data={trendData} />
          </Grid>
          <WCSDataTable data={filteredData} />
        </Stack>

        <Stack gap={8}>
          <WCSExportConsole data={filteredData} />
          <WCSScraperStats />
        </Stack>
      </Grid>
    </Stack>
  );
}
